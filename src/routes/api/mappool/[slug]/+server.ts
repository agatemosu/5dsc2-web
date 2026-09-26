import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async (event) => {
	if (import.meta.env.PROD) {
		if (!event.locals.apiKey) {
			return error(401, 'No API Key defined');
		}

		if (event.locals.apiKey !== env.POOLING_API_KEY) {
			return error(401, 'Invalid API Key');
		}
	}

	const pool = await db.query.rounds.findFirst({
		where: {
			slug: event.params.slug,
		},
		with: {
			mappools: {
				with: {
					beatmap: {
						with: {
							beatmapset: true,
						},
					},
				},
			},
		},
	});

	if (!pool) {
		error(404, 'Round not found');
	}

	return json(pool);
};
