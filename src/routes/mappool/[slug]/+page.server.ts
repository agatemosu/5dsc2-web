import { dates, isFutureAndProd } from '$lib/dates';
import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { definePageMetaTags } from 'svelte-meta-tags';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (isFutureAndProd(dates.qualifiers.start)) {
		return error(403);
	}

	const pageTags = definePageMetaTags({
		title: 'Mappool',
	});

	const round = await db.query.rounds.findFirst({
		where: {
			slug: event.params.slug,
		},
		with: {
			mappools: {
				with: {
					beatmap: {
						with: { beatmapset: true },
					},
				},
			},
		},
	});

	if (
		round?.mappoolPublishedAt == null ||
		Temporal.Instant.compare(Temporal.Now.instant(), round.mappoolPublishedAt) < 0
	) {
		return error(403);
	}

	const rounds = await db.query.rounds.findMany();

	return {
		rounds,
		round,
		...pageTags,
	};
};
