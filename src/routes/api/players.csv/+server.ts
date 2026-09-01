import { db } from '$lib/server/db';
import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const players = await db.query.players.findMany({
		columns: {},
		with: {
			osu: {
				columns: { id: true, username: true },
			},
		},
	});

	const rows = [
		'id,username',
		...players.map(({ osu }) => `${osu.id},${osu.username}`),
	];

	return text(rows.join('\n'));
};
