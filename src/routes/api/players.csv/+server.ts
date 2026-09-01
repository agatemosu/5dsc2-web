import { db } from '$lib/server/db';
import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const players = await db.query.players.findMany({
		where: {
			registeredAt: { isNotNull: true },
		},
		columns: {},
		with: {
			osu: {
				columns: { id: true, username: true },
			},
		},
	});

	const rows = players.map(({ osu }) => `${osu.username},${osu.id}`);

	return text(rows.join('\n'));
};
