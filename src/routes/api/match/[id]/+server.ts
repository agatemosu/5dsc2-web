import { db } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const match = await db.query.matches.findFirst({
		where: { id: event.params.id },
		columns: { rundown: true },
	});

	if (!match) {
		return error(404, 'Match not found');
	}

	return json(match);
};
