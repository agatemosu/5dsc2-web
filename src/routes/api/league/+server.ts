import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { error, json } from '@sveltejs/kit';
import { eq, inArray, sql } from 'drizzle-orm';
import { z } from 'zod';
import type { RequestHandler } from './$types';

const leaderboardSchema = z.object({
	player: z.number(),
	g: z.number(),
	e: z.number(),
	p: z.number(),
	pick_diff: z.number(),
	pts: z.number(),
});

const leaderboardSyncSchema = z.object({
	upsert: z.array(leaderboardSchema),
	delete: z.array(z.number()),
});

async function findPlayers(osuIds: number[]) {
	const players = await db
		.select({
			userId: table.players.userId,
			osuId: table.users.osuId,
		})
		.from(table.players)
		.innerJoin(table.users, eq(table.players.userId, table.users.id))
		.where(inArray(table.users.osuId, osuIds));

	const grouped = new Map(players.map((row) => [row.osuId, row.userId]));
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
	const result = leaderboardSyncSchema.safeParse(body);

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

	const osuIds = new Set([...upsert.map((m) => m.player), ...deleteIds]);
	const userIds = await findPlayers(Array.from(osuIds));

	if (osuIds.size !== userIds.size) {
		return error(404, 'Some player not found');
	}

	const insertItems = upsert.map((item) => {
		const userId = userIds.get(item.player) as number;

		const insert: table.LeagueLeaderboard = {
			userId: userId,
			wins: item.g,
			draws: item.e,
			losses: item.p,
			difference: item.pick_diff,
			points: item.pts,
		};

		return insert;
	});

	await db.transaction(async (tx) => {
		if (deleteIds.length > 0) {
			await tx.delete(table.leagueLeaderboard).where(
				inArray(
					table.leagueLeaderboard.userId,
					deleteIds.map((osuId) => userIds.get(osuId) as number),
				),
			);
		}

		if (insertItems.length > 0) {
			await tx
				.insert(table.leagueLeaderboard)
				.values(insertItems)
				.onConflictDoUpdate({
					target: table.leagueLeaderboard.userId,
					set: {
						wins: sql`excluded.wins`,
						draws: sql`excluded.draws`,
						losses: sql`excluded.losses`,
						difference: sql`excluded.difference`,
						points: sql`excluded.points`,
					},
				});
		}
	});

	return json({
		success: true,
	});
};
