import { rounds } from '$lib/rounds-dummy';
import * as sitemap from 'super-sitemap/sveltekit';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	return await sitemap.response({
		origin: 'https://2026.5digit.spanishcup.es',
		paramValues: {
			'/mappool/[slug]': rounds.filter((r) => r.published).map((r) => r.slug),
		},
	});
};
