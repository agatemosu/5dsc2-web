import { resolve } from '$app/paths';
import { dates } from '$lib/dates';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	if (
		import.meta.env.PROD &&
		Temporal.ZonedDateTime.compare(Temporal.Now.zonedDateTimeISO(), dates.qualifiers.start) < 0
	) {
		return error(403);
	}

	const rounds = [
		{ id: 1, name: 'qualifiers', slug: 'qualifiers', published: true },
		{ id: 2, name: 'liga fase 1', slug: 'liga-fase-1', published: true },
		{ id: 3, name: 'liga fase 2', slug: 'liga-fase-2', published: true },
		{ id: 4, name: 'la purga', slug: 'la-purga', published: true },
		{ id: 5, name: 'ro16', slug: 'ro16', published: false },
		{ id: 6, name: 'ro8', slug: 'ro8', published: false },
		{ id: 7, name: 'semifinals', slug: 'semifinals', published: false },
		{ id: 8, name: 'finals', slug: 'finals', published: false },
		{ id: 9, name: 'grandfinals', slug: 'grandfinals', published: false },
	];

	const lastPublishedRound = rounds.findLast((r) => r.published === true);

	if (!lastPublishedRound) {
		return error(404);
	}

	return redirect(307, resolve('/mappool/[slug]', { slug: lastPublishedRound.slug }));
};
