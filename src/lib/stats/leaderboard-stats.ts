import type { FullMappool, ScoreWithPlayer } from '$lib/types';

interface SoloStat {
	map: FullMappool;
	highestScore: ScoreWithPlayer;
	scores: ScoreWithPlayer[];
}

export function groupMapScores(scores: ScoreWithPlayer[], maps: FullMappool[]): SoloStat[] {
	const scoreGroups = Map.groupBy(
		scores.toSorted((a, b) => b.score - a.score),
		(score) => score.pick,
	);

	const result: SoloStat[] = [];

	for (const map of maps) {
		const pick = `${map.slotName}${map.slotIndex}`;
		const scores = scoreGroups.get(pick);

		if (!scores || scores.length === 0) {
			continue;
		}

		result.push({
			map,
			highestScore: scores[0],
			scores: scores,
		});
	}

	return result;
}
