import { db } from '$lib/server/db';
import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const rooms = await db.query.qualifierRooms.findMany({
		orderBy: { id: 'asc' },
		columns: { id: true },
		with: {
			players: {
				columns: {},
				with: {
					osu: { columns: { username: true } },
				},
			},
		},
	});

	const rows = rooms.map((room) =>
		[
			room.id,
			...room.players.map((player) => player.osu.username),
			...Array(16 - room.players.length).fill(null),
		].join(','),
	);

	return text(rows.join('\n'));
};
