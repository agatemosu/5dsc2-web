import { db } from '$lib/server/db';
import { definePageMetaTags } from 'svelte-meta-tags';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const pageTags = definePageMetaTags({
		title: 'Jugadores',
	});

	const players = await db.query.players.findMany({
		columns: { registeredAt: true, seed: true },
		with: {
			osu: true,
		},
	});

	const allHaveSeed = players.length > 1 && players.every((player) => player.seed != null);
	players.sort((a, b) => {
		if (allHaveSeed) {
			if (a.seed === -1 && b.seed !== -1) return 1;
			if (a.seed !== -1 && b.seed === -1) return -1;

			return a.seed! - b.seed!;
		}

		return Temporal.Instant.compare(a.registeredAt, b.registeredAt);
	});

	return {
		players,
		allHaveSeed,
		...pageTags,
	};
};
