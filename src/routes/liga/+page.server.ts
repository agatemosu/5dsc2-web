import { dates, isFutureAndProd } from '$lib/dates';
import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { definePageMetaTags } from 'svelte-meta-tags';

export const load = async () => {
	if (isFutureAndProd(dates.liga_fase_1.start)) {
		return error(403);
	}

	const pageTags = definePageMetaTags({
		title: 'Liga',
	});

	const leagueLeaderboard = await db.query.leagueLeaderboard.findMany({
		with: {
			user: {
				columns: {},
				with: {
					osu: {
						columns: { id: true, username: true },
					},
				},
			},
		},
	});

	return {
		leagueLeaderboard,
		...pageTags,
	};
};
