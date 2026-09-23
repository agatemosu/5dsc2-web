import { resolve } from '$app/paths';
import { dates, isFutureAndProd } from '$lib/dates';
import { db } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { StageType } from '$lib/enums';

export const GET: RequestHandler = async () => {
	if (isFutureAndProd(dates.qualifiers.end)) {
		return error(403);
	}

	const lastPublishedRound = await db.query.rounds.findFirst({
		where: {
			stageType: { NOT: StageType.Qualifiers },
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

	return redirect(307, resolve('/matches/[slug]', { slug: lastPublishedRound.slug }));
};
