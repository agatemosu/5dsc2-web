import { MatchStatus } from '$lib/enums';
import { db } from '$lib/server/db';
import type { LastMatch, NextMatch } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const nextMatch = await db.query.matches.findFirst({
		where: {
			startTime: { gt: Temporal.Now.instant() },
			teamRedId: { isNotNull: true },
			teamBlueId: { isNotNull: true },
		},
		columns: {
			startTime: true,
		},
		with: {
			red: {
				columns: { seed: true },
				with: {
					osu: {
						columns: { id: true, username: true },
					},
				},
			},
			blue: {
				columns: { seed: true },
				with: {
					osu: {
						columns: { id: true, username: true },
					},
				},
			},
		},
		orderBy: {
			startTime: 'asc',
		},
	});

	const lastMatches = await db.query.matches.findMany({
		where: {
			status: MatchStatus.Finished,
		},
		columns: {
			startTime: true,
			teamRedPoints: true,
			teamBluePoints: true,
		},
		with: {
			red: {
				columns: { seed: true },
				with: {
					osu: {
						columns: { id: true, username: true },
					},
				},
			},
			blue: {
				columns: { seed: true },
				with: {
					osu: {
						columns: { id: true, username: true },
					},
				},
			},
		},
		orderBy: {
			startTime: 'desc',
		},
		limit: 7,
	});

	return {
		nextMatch: nextMatch as NextMatch | undefined,
		lastMatches: lastMatches as LastMatch[],
	};
};
