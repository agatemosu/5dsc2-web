import { error } from '@sveltejs/kit';
import { definePageMetaTags } from 'svelte-meta-tags';

import { dates, isFutureAndProd } from '#lib/dates.ts';
import { StageType } from '#lib/enums.ts';
import { db } from '#lib/server/db/index.ts';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (isFutureAndProd(dates.qualifiers.end)) {
		return error(403);
	}

	const pageTags = definePageMetaTags({
		title: 'Partidos',
	});

	const round = await db.query.rounds.findFirst({
		where: {
			slug: event.params.slug,
		},
		with: {
			matches: {
				with: {
					red: {
						with: { osu: true },
					},
					blue: {
						with: { osu: true },
					},
				},
				where: {
					parentMatchId: { isNull: true },
				},
				orderBy: {
					startTime: 'asc',
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

	const rounds = await db.query.rounds.findMany({
		where: {
			stageType: { NOT: StageType.Qualifiers },
		},
		columns: { slug: true, name: true, mappoolPublishedAt: true },
	});

	return {
		rounds,
		round,
		...pageTags,
	};
};
