import { db } from '$lib/server/db';
import * as sitemap from 'super-sitemap/sveltekit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const rounds = await db.query.rounds.findMany({
		columns: { slug: true },
		where: {
			mappoolPublishedAt: { isNotNull: true },
		},
	});

	return await sitemap.response({
		origin: 'https://2026.5digit.spanishcup.es',
		paramValues: {
			'/mappool/[slug]': rounds.map((r) => r.slug),
		},
	});
};
