import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const players = await db.query.players.findMany({
		columns: {},
		with: {
			osu: {
				columns: { countryRank: false },
			},
		},
	});

	return json(players.map((p) => p.osu));
};
