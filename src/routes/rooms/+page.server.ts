import { ROOM_SIZE } from '$lib/consts';
import { dates, isFutureAndProd, isPastAndProd } from '$lib/dates';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { definePageMetaTags } from 'svelte-meta-tags';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (isFutureAndProd(dates.qualifiers.start)) {
		return error(403);
	}

	const pageTags = definePageMetaTags({
		title: 'Salas',
	});

	const rooms = await db.query.qualifierRooms.findMany({
		with: {
			players: {
				columns: {},
				with: {
					osu: { columns: { username: true } },
				},
			},
		},
	});

	const player = event.locals.user?.player;

	const selectedRoom = player?.qualifierRoomId
		? rooms.find((room) => room.id === player.qualifierRoomId)
		: null;

	return {
		rooms,
		selectedRoom,
		...pageTags,
	};
};

export const actions: Actions = {
	select: async (event) => {
		if (isFutureAndProd(dates.qualifiers.start)) {
			return fail(403);
		}

		const { user } = event.locals;
		if (user?.player == null) {
			return fail(401);
		}

		const formData = await event.request.formData();
		const roomId = formData.get('room_id');

		if (typeof roomId !== 'string') {
			return fail(400);
		}

		if (isPastAndProd(dates.qualifiers.end)) {
			return fail(410);
		}

		const players = await db.$count(table.players, eq(table.players.qualifierRoomId, roomId));

		if (players >= ROOM_SIZE) {
			return fail(409);
		}

		await db
			.update(table.players)
			.set({
				qualifierRoomId: roomId,
			})
			.where(eq(table.players.userId, user.id));
	},
};
