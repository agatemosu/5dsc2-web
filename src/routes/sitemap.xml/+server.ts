import { eq, exists } from 'drizzle-orm';
import * as sitemap from 'super-sitemap/sveltekit';

import { StageType } from '#lib/enums.ts';
import { db } from '#lib/server/db/index.ts';
import * as table from '#lib/server/db/schema.ts';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const rounds = await db.query.rounds.findMany({
		where: {
			mappoolPublishedAt: { isNotNull: true },
		},
		columns: { slug: true, stageType: true },
		extras: {
			hasScores: (t) =>
				exists(db.select().from(table.scores).where(eq(table.scores.roundId, t.id)).limit(1)),
		},
	});

	return await sitemap.response({
		origin: 'https://2026.5digit.spanishcup.es',
		paramValues: {
			'/mappool/[slug]': rounds.map((r) => r.slug),
			'/matches/[slug]': rounds
				.filter((r) => r.stageType !== StageType.Qualifiers)
				.map((r) => r.slug),
			'/stats/[slug]': rounds.filter((r) => r.hasScores).map((r) => r.slug),
		},
	});
};
