import { env } from '$env/dynamic/private';
import { DraftAction, DraftActor, MatchStatus } from '$lib/enums';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { error, json } from '@sveltejs/kit';
import { eq, inArray, sql } from 'drizzle-orm';
import { z } from 'zod';
import type { RequestHandler } from './$types';

const teamSchema = z.object({
	id: z.number(),
	name: z.string(),
	points: z.number().optional(),
});

const draftEntry = z.object({
	action: z.string().toUpperCase().pipe(z.enum(DraftAction)),
	actor: z.string().toUpperCase().pipe(z.enum(DraftActor)),
	pick: z.string(),
	winner: z.string().toUpperCase().pipe(z.enum(DraftActor)).optional(),
});

const matchSchema = z.object({
	id: z.string(),
	stage: z.string(),
	bracket: z.string().nullable(),
	datetime: z.iso.datetime({ offset: true }).transform((v) => Temporal.Instant.from(v)),
	referee: z.string().nullable(),
	red: teamSchema,
	blue: teamSchema,
	mp_link: z.url({ hostname: /^osu\.ppy\.sh$/ }).nullable(),
	rundown: z.array(draftEntry),
	first_to: z.number(),
	status: z.enum(MatchStatus),
});

const matchSyncSchema = z.object({
	upsert: z.array(matchSchema),
	delete: z.array(z.string()),
});

async function findRounds(slugs: string[]) {
	const rounds = await db.query.rounds.findMany({
		where: {
			slug: { in: slugs },
		},
		columns: { id: true, slug: true },
	});

	const grouped = new Map(rounds.map((item) => [item.slug, item.id]));
	return grouped;
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
	const result = matchSyncSchema.safeParse(body);

	if (!result.success) {
		return error(400, {
			message: 'Invalid body format',
			data: {
				reason: result.error.issues,
			},
		});
	}

	const { upsert, delete: deleteIds } = result.data;

	if (upsert.length === 0 && deleteIds.length === 0) {
		return json({
			success: true,
			upserted: 0,
			deleted: 0,
		});
	}

	const roundNames = new Set(upsert.map((m) => m.stage));
	const roundIds = await findRounds(Array.from(roundNames));

	if (roundNames.size !== roundIds.size) {
		return error(404, 'Some round not found');
	}

	const osuIds = new Set(upsert.flatMap((m) => [m.red.id, m.blue.id]));
	const playerIds = await findPlayers(Array.from(osuIds));

	if (osuIds.size !== playerIds.size) {
		return error(404, 'Some player not found');
	}

	const insertMatches = upsert.map((match) => {
		const teamRedId = playerIds.get(match.red.id) as number;
		const teamBlueId = playerIds.get(match.blue.id) as number;

		let osuMatchId: number | null = null;
		if (match.mp_link) {
			const url = new URL(match.mp_link);
			const matchId = url.pathname.match(/^\/(?:community\/matches|mp)\/(\d+)$/);
			if (matchId) {
				osuMatchId = Number(matchId[1]);
			}
		}

		const insert: table.Match = {
			id: match.id,
			roundId: roundIds.get(match.stage) as number,
			bracket: match.bracket,
			status: match.status,
			startTime: match.datetime,
			teamRedId,
			teamBlueId,
			teamRedPoints: match.red.points ?? null,
			teamBluePoints: match.blue.points ?? null,
			rundown: match.rundown,
			refereeName: match.referee,
			osuMatchId,
		};

		return insert;
	});

	await db.transaction(async (tx) => {
		if (deleteIds.length > 0) {
			await tx.delete(table.matches).where(inArray(table.matches.id, deleteIds));
		}

		if (insertMatches.length > 0) {
			await tx
				.insert(table.matches)
				.values(insertMatches)
				.onConflictDoUpdate({
					target: table.matches.id,
					set: {
						roundId: sql`excluded.round_id`,
						bracket: sql`excluded.bracket`,
						status: sql`excluded.status`,
						startTime: sql`excluded.start_time`,
						teamRedId: sql`excluded.team_red_id`,
						teamBlueId: sql`excluded.team_blue_id`,
						teamRedPoints: sql`excluded.team_red_points`,
						teamBluePoints: sql`excluded.team_blue_points`,
						rundown: sql`excluded.rundown`,
						refereeName: sql`excluded.referee_name`,
						osuMatchId: sql`excluded.osu_match_id`,
					},
				});
		}
	});

	return json({
		success: true,
		upserted: insertMatches.length,
		deleted: deleteIds.length,
	});
};
