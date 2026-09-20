import { env } from '$env/dynamic/private';
import { Mod } from '$lib/enums';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { osuApi } from '$lib/server/osu';
import { error, json } from '@sveltejs/kit';
import { eq, sql } from 'drizzle-orm';
import type { Beatmap } from 'osu-api-v2-js';
import { z } from 'zod';
import type { RequestHandler } from './$types';

const modSchema = z.enum(Mod);

const slotSchema = z.object({
	id: z.number(),
	custom: z.boolean(),
	suggestor: z.string(),
	pooler_notes: z.string(),
});

const requestSchema = z.object({
	acronym: z.string(),
	title: z.string(),
	release_date: z.iso.datetime(),
	mappack_link: z.url(),
	pool: z.partialRecord(modSchema, z.array(slotSchema)),
});

type RequestBody = z.infer<typeof requestSchema>;

async function findRound(input: RequestBody) {
	const title = input.title.toLowerCase();
	const acronym = input.acronym.toLowerCase();

	return db.query.rounds.findFirst({
		where: {
			OR: [{ name: title }, { slug: title }, { slug: acronym }],
		},
		columns: {
			id: true,
		},
	});
}

async function fetchAndValidateMaps(pool: RequestBody['pool']) {
	const requestedIds = Object.values(pool).flatMap((slots) => slots.map((slot) => slot.id));
	const uniqueIds = [...new Set(requestedIds)];

	const maps = await osuApi.getBeatmaps(uniqueIds);

	const foundIds = new Set(maps.map((map) => map.id));
	const missingIds = uniqueIds.filter((id) => !foundIds.has(id));

	if (missingIds.length > 0) {
		return error(400, {
			message: 'Some beatmaps do not exist',
			data: { missingIds },
		});
	}

	const notOsuMaps = maps.filter((map) => map.mode !== 'osu').map((map) => map.id);

	if (notOsuMaps.length > 0) {
		return error(400, {
			message: 'Some beatmaps are not osu! beatmaps',
			data: { notOsuMaps },
		});
	}

	return maps;
}

async function getStarRating(map: Beatmap, mod: Mod) {
	if (mod === Mod.NM || mod === Mod.TB) {
		return map.difficulty_rating;
	}

	const attributes = await osuApi.getBeatmapDifficultyAttributesOsu(map, [mod]);

	return attributes.star_rating;
}

export const POST: RequestHandler = async (event) => {
	if (import.meta.env.PROD) {
		if (!event.locals.apiKey) {
			return error(401, 'No API Key defined');
		}

		if (event.locals.apiKey !== env.API_KEY) {
			return error(401, 'Invalid API Key');
		}
	}

	const body = await event.request.json();
	const result = requestSchema.safeParse(body);

	if (!result.success) {
		return error(400, {
			message: 'Invalid body format',
			data: {
				reason: result.error.issues,
			},
		});
	}

	const round = await findRound(result.data);

	if (!round) {
		return error(404, {
			message: 'Round not found',
		});
	}

	const maps = await fetchAndValidateMaps(result.data.pool);

	// Beatmapsets
	const mapsets = new Map(maps.map((map) => [map.beatmapset_id, map.beatmapset]));

	const mapsetsInsert = Array.from(
		mapsets.values().map(
			(s) =>
				({
					id: s.id,
					title: s.title,
					artist: s.artist,
					creator: s.creator,
				}) satisfies table.Beatmapset,
		),
	);

	// Beatmaps
	const mapsInsert = maps.map(
		(m) =>
			({
				id: m.id,
				beatmapsetId: m.beatmapset_id,
				circleSize: m.cs,
				approachRate: m.ar,
				overallDifficulty: m.accuracy,
				length: m.hit_length,
				bpm: m.bpm,
				version: m.version,
			}) satisfies table.Beatmap,
	);

	// Beatmapset
	const mapsById = new Map(maps.map((map) => [map.id, map]));

	const mappoolInsert = await Promise.all(
		Object.entries(result.data.pool).flatMap(([mod, slots]) =>
			slots.map(async (slot, index) => {
				const map = mapsById.get(slot.id)!;

				return {
					roundId: round.id,
					beatmapId: slot.id,
					slotName: mod as Mod,
					slotIndex: index + 1,
					custom: slot.custom,
					suggestor: slot.suggestor,
					poolerNotes: slot.pooler_notes,
					starRating: await getStarRating(map, mod as Mod),
				} satisfies typeof table.mappools.$inferInsert;
			}),
		),
	);

	await db.transaction(async (tx) => {
		await tx
			.insert(table.beatmapsets)
			.values(mapsetsInsert)
			.onConflictDoUpdate({
				target: table.beatmapsets.id,
				set: {
					title: sql`excluded.title`,
					artist: sql`excluded.artist`,
					creator: sql`excluded.creator`,
				},
			});

		await tx
			.insert(table.beatmaps)
			.values(mapsInsert)
			.onConflictDoUpdate({
				target: table.beatmaps.id,
				set: {
					circleSize: sql`excluded.circle_size`,
					approachRate: sql`excluded.approach_rate`,
					overallDifficulty: sql`excluded.overall_difficulty`,
					length: sql`excluded.length`,
					bpm: sql`excluded.bpm`,
					version: sql`excluded.version`,
				},
			});

		await tx.delete(table.mappools).where(eq(table.mappools.roundId, round.id));
		await tx.insert(table.mappools).values(mappoolInsert);

		await tx
			.update(table.rounds)
			.set({
				mappackUrl: result.data.mappack_link,
				mappoolPublishedAt: Temporal.Instant.from(result.data.release_date),
			})
			.where(eq(table.rounds.id, round.id));
	});

	return json({
		success: true,
	});
};
