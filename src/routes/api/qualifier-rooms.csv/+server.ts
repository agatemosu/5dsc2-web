import { ROOM_SIZE } from '#lib/consts.ts';
import { db } from '#lib/server/db/index.ts';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const rooms = await db.query.qualifierRooms.findMany({
		orderBy: { id: 'asc' },
		columns: { id: true, startTime: true },
		with: {
			players: {
				columns: {},
				with: {
					osu: { columns: { username: true } },
				},
			},
		},
	});

	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		timeZone: 'Europe/Madrid',
	});
	const timeFormatter = new Intl.DateTimeFormat('es-ES', {
		timeStyle: 'short',
		timeZone: 'Europe/Madrid',
	});

	const rows = rooms.map((room) =>
		[
			room.id,
			dateFormatter.format(room.startTime),
			timeFormatter.format(room.startTime),
			...room.players.map((player) => player.osu.username),
			...Array<null>(ROOM_SIZE - room.players.length).fill(null),
		].join(','),
	);

	return new Response(rows.join('\n'));
};
