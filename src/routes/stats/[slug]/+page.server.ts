import { error } from '@sveltejs/kit';
import { eq, exists } from 'drizzle-orm';
import { definePageMetaTags } from 'svelte-meta-tags';

import { dates, isFutureAndProd } from '#lib/dates.ts';
import { db } from '#lib/server/db/index.ts';
import * as table from '#lib/server/db/schema.ts';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (isFutureAndProd(dates.qualifiers.start)) {
		return error(403);
	}

	const pageTags = definePageMetaTags({
		title: 'Stats',
	});

	const round = await db.query.rounds.findFirst({
		where: {
			slug: event.params.slug,
			scores: true,
		},
		with: {
			mappools: {
				with: {
					beatmap: {
						with: { beatmapset: true },
					},
				},
			},
			scores: {
				with: {
					player: {
						columns: { id: true },
						with: {
							osu: {
								columns: { username: true },
							},
						},
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

	const rounds = await db.query.rounds.findMany({
		extras: {
			hasScores: (t) =>
				exists(db.select().from(table.scores).where(eq(table.scores.roundId, t.id)).limit(1)),
		},
		columns: { slug: true, name: true },
	});

	return {
		rounds,
		round,
		...pageTags,
	};
};
