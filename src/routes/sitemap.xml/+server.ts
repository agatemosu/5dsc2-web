import { StageType } from '$lib/enums';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import * as sitemap from 'super-sitemap/sveltekit';
import type { RequestHandler } from './$types';
import { eq, exists } from 'drizzle-orm';

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
