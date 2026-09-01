import { db } from '$lib/server/db';
import { text } from '@sveltejs/kit';
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

	const rows = [
		'id,username,country_rank',
		players.map(({ osu }) => `${osu.id},${osu.username},${osu.globalRank}`),
	];

	return text(rows.join('\n'));
};
