import { resolve } from '$app/paths';
import { dates } from '$lib/dates';
import { rounds } from '$lib/rounds-dummy';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	if (
		import.meta.env.PROD &&
		Temporal.ZonedDateTime.compare(Temporal.Now.zonedDateTimeISO(), dates.qualifiers.start) < 0
	) {
		return error(403);
	}

	const lastPublishedRound = rounds.findLast((r) => r.published === true);

	if (!lastPublishedRound) {
		return error(404);
	}

	return redirect(307, resolve('/mappool/[slug]', { slug: lastPublishedRound.slug }));
};
