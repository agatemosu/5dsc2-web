import { resolve } from '$app/paths';
import { error, redirect } from '@sveltejs/kit';

import { dates, isFutureAndProd } from '#lib/dates.ts';
import { db } from '#lib/server/db/index.ts';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	if (isFutureAndProd(dates.qualifiers.start)) {
		return error(403);
	}

	const lastPublishedRound = await db.query.rounds.findFirst({
		where: {
			mappoolPublishedAt: { lt: Temporal.Now.instant() },
		},
		columns: { slug: true },
		orderBy: {
			mappoolPublishedAt: 'desc',
		},
	});

	if (!lastPublishedRound) {
		return error(404);
	}

	return redirect(307, resolve('/mappool/[slug]', { slug: lastPublishedRound.slug }));
};
