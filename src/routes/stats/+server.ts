import { resolve } from '$app/paths';
import { dates, isFutureAndProd } from '$lib/dates';
import { db } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	if (isFutureAndProd(dates.qualifiers.start)) {
		return error(403);
	}

	const lastPublishedRound = await db.query.rounds.findFirst({
		where: {
			mappoolPublishedAt: { lt: Temporal.Now.instant() },
			scores: true,
		},
		columns: { slug: true },
		orderBy: {
			mappoolPublishedAt: 'desc',
		},
	});

	if (!lastPublishedRound) {
		return error(404);
	}

	return redirect(307, resolve('/stats/[slug]', { slug: lastPublishedRound.slug }));
};
