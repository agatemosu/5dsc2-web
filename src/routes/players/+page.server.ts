import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { definePageMetaTags } from 'svelte-meta-tags';

export const load: PageServerLoad = async () => {
	const pageTags = definePageMetaTags({
		title: 'Jugadores',
	});

	const players = await db.query.player.findMany({
		columns: { registeredAt: true, seed: true },
		with: {
			user: {
				columns: {},
				with: {
					osu: true,
				},
			},
		},
	});

	const allHaveSeed = players.length > 1 && players.every((player) => player.seed != null);
	players.sort((a, b) => {
		if (allHaveSeed) {
			if (a.seed === -1 && b.seed !== -1) return 1;
			if (a.seed !== -1 && b.seed === -1) return -1;

			return a.seed! - b.seed!;
		}

		return a.registeredAt!.getTime() - b.registeredAt!.getTime();
	});

	return {
		players,
		allHaveSeed,
		...pageTags,
	};
};
