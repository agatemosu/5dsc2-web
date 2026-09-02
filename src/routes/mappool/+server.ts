import { resolve } from '$app/paths';
import { dates } from '$lib/dates';
import { db } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	if (
		import.meta.env.PROD &&
		Temporal.ZonedDateTime.compare(Temporal.Now.zonedDateTimeISO(), dates.qualifiers.start) < 0
	) {
		return error(403);
	}

	const lastPublishedRound = await db.query.rounds.findFirst({
		where: {
			mappoolPublishedAt: { isNotNull: true },
		},
		orderBy: {
			mappoolPublishedAt: 'desc',
		},
	});

	if (!lastPublishedRound) {
		return error(404);
	}

	return redirect(307, resolve('/mappool/[slug]', { slug: lastPublishedRound.slug }));
};
