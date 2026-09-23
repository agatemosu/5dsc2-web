import { env } from '$env/dynamic/private';
import { Grade, Mod } from '$lib/enums';
import { toLegacyBitset } from '$lib/mods/bitset';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { error, json } from '@sveltejs/kit';
import { eq, inArray } from 'drizzle-orm';
import { z } from 'zod';
import type { RequestHandler } from './$types';

const scoreSchema = z.object({
	event_id: z.number(),
	pick: z.string(),
	match_id: z.number(),
	user_id: z.number(),
	score: z.number(),
	accuracy: z.number(),
	grade: z.enum(Grade),
	mods: z.array(z.enum(Mod)),
});

const statsSchema = z.object({
	stage: z.string(),
	scores: z.array(scoreSchema),
});

async function findRound(slug: string) {
	const round = await db.query.rounds.findFirst({
		where: { slug: slug },
		columns: { id: true },
	});

	return round;
}

async function findPlayers(osuIds: number[]) {
	const players = await db
		.select({
			playerId: table.players.id,
			osuId: table.users.osuId,
		})
		.from(table.players)
		.innerJoin(table.users, eq(table.players.userId, table.users.id))
		.where(inArray(table.users.osuId, osuIds));

	const grouped = new Map(players.map((row) => [row.osuId, row.playerId]));
	return grouped;
}

export const POST: RequestHandler = async (event) => {
	if (import.meta.env.PROD) {
		if (!event.locals.apiKey) {
			return error(401, 'No API Key defined');
		}

		if (event.locals.apiKey !== env.REFEREE_API_KEY) {
			return error(401, 'Invalid API Key');
		}
	}

	const body = await event.request.json();
	const result = statsSchema.safeParse(body);

	if (!result.success) {
		return error(400, {
			message: 'Invalid body format',
			data: {
				reason: result.error.issues,
			},
		});
	}

	const round = await findRound(result.data.stage);

	if (!round) {
		return error(404, 'Round not found');
	}

	const osuIds = new Set(result.data.scores.flatMap((m) => m.user_id));
	const playerIds = await findPlayers(Array.from(osuIds));

	if (osuIds.size !== playerIds.size) {
		return error(404, 'Some player not found');
	}

	const insertScores = result.data.scores.map((score) => {
		const playerId = playerIds.get(score.user_id);

		if (playerId === undefined) {
			throw error(500, 'Some player not found');
		}

		const insert: typeof table.scores.$inferInsert = {
			roundId: round.id,
			eventId: score.event_id,
			playerId,
			pick: score.pick,
			score: score.score,
			accuracy: score.accuracy,
			grade: score.grade,
			modsBitset: toLegacyBitset(score.mods),
		};

		return insert;
	});

	await db.insert(table.scores).values(insertScores);

	return json({
		success: true,
	});
};
