import { StageType } from '$lib/enums';
import { db } from '$lib/server/db';
import * as sitemap from 'super-sitemap/sveltekit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const rounds = await db.query.rounds.findMany({
		where: {
			mappoolPublishedAt: { isNotNull: true },
		},
		columns: { slug: true, stageType: true },
	});

	return await sitemap.response({
		origin: 'https://2026.5digit.spanishcup.es',
		paramValues: {
			'/mappool/[slug]': rounds.map((r) => r.slug),
			'/matches/[slug]': rounds
				.filter((r) => r.stageType !== StageType.Qualifiers)
				.map((r) => r.slug),
		},
	});
};
