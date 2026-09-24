import { db } from '$lib/server/db';
import { definePageMetaTags } from 'svelte-meta-tags';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const players = await db.query.players.findMany({
		columns: { registeredAt: true, seed: true, qualifierRoomId: true },
		with: {
			osu: true,
		},
	});

	const pageTags = definePageMetaTags({
		title: `Jugadores (${players.length})`,
	});

	const allHaveSeed =
		players.length > 1 &&
		players.every((player) => player.seed !== null || player.qualifierRoomId === null);
	players.sort((a, b) => {
		if (allHaveSeed) {
			const aSeed = a.seed == null || a.seed === -1 ? Number.POSITIVE_INFINITY : a.seed;
			const bSeed = b.seed == null || b.seed === -1 ? Number.POSITIVE_INFINITY : b.seed;

			return aSeed - bSeed;
		}

		return Temporal.Instant.compare(a.registeredAt, b.registeredAt);
	});

	return {
		players,
		allHaveSeed,
		...pageTags,
	};
};
