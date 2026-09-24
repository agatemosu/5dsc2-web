import type { FullMappool, ScoreWithPlayer } from '$lib/types';

interface SoloStat {
	map: FullMappool;
	highestScore: ScoreWithPlayer;
	scores: ScoreWithPlayer[];
}

export function groupMapScores(scores: ScoreWithPlayer[], maps: FullMappool[]): SoloStat[] {
	const mapKeyed = new Map(maps.map((map) => [`${map.slotName}${map.slotIndex}`, map]));

	const scoreGroups = Map.groupBy(scores, (score) => score.pick);

	const result: SoloStat[] = [];
	for (const [pick, scores] of scoreGroups) {
		scores.sort((a, b) => b.score - a.score);
		const map = mapKeyed.get(pick);

		if (!map || scores.length === 0) {
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
