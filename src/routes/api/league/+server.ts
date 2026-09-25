import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { error, json } from '@sveltejs/kit';
import { eq, inArray } from 'drizzle-orm';
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
	const result = z.array(leaderboardSchema).safeParse(body);

	if (!result.success) {
		return error(400, {
			message: 'Invalid body format',
			data: {
				reason: result.error.issues,
			},
		});
	}

	const osuIds = new Set(result.data.map((m) => m.player));
	const userIds = await findPlayers(Array.from(osuIds));

	if (osuIds.size !== userIds.size) {
		return error(404, 'Some player not found');
	}

	const insertItems = result.data.map((item) => {
		const userId = userIds.get(item.player);

		if (userId === undefined) {
			throw error(500, 'Some player not found');
		}

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
		// Delete ALL leaderboard
		await tx.delete(table.leagueLeaderboard);
		await tx.insert(table.leagueLeaderboard).values(insertItems);
	});

	return json({
		success: true,
	});
};
