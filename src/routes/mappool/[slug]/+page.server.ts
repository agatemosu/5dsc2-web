import { dates } from '$lib/dates';
import { rounds } from '$lib/rounds-dummy';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (
		import.meta.env.PROD &&
		Temporal.ZonedDateTime.compare(Temporal.Now.zonedDateTimeISO(), dates.qualifiers.start) < 0
	) {
		return error(403);
	}

	const mappool = [
		{
			slot: {
				mod: 'NM',
				idx: 1,
			},
			custom: true,
			beatmapset: {
				id: 1002554,
				title: 'Lost My Way',
				artist: 'FELT',
				mapper: {
					name: 'RLC',
					id: 1047883,
				},
				bpm: 240,
				length: 369,
			},
			diff: {
				id: 2098486,
				name: 'Absolution',
				starRating: 6.8,
				circleSize: 4,
				approachRate: 9.5,
				overallDifficulty: 8.8,
			},
		},
	];

	const round = {
		...rounds.find((r) => r.slug === event.params.slug),
		mappackUrl: event.url.href,
		mappool,
	};

	return { rounds, round };
};
