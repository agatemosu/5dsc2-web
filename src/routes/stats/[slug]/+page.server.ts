import { dates, isFutureAndProd } from '$lib/dates';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { definePageMetaTags } from 'svelte-meta-tags';
import type { PageServerLoad } from './$types';
import { eq, exists } from 'drizzle-orm';

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
						columns: {},
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
