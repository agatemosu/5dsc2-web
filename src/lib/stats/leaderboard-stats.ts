import type { FullMappool, ScoreWithPlayer } from '$lib/types';

interface SoloStat {
	map: FullMappool;
	highestScore: ScoreWithPlayer;
	scores: ScoreWithPlayer[];
}

export function groupMapScores(scores: ScoreWithPlayer[], maps: FullMappool[]): SoloStat[] {
	const mapKeyed = new Map<string, FullMappool>();
	for (const map of maps) {
		const name = `${map.slotName}${map.slotIndex}`;
		mapKeyed.set(name, map);
	}

	const scoreGroups = Map.groupBy(scores, (score) => score.pick);

	const result: SoloStat[] = [];
	for (const [pick, scores] of scoreGroups) {
		const highestScore = scores.reduce((max, current) =>
			current.score > max.score ? current : max,
		);
		result.push({
			map: mapKeyed.get(pick) as FullMappool,
			highestScore,
			scores,
		});
	}

	return result;
}
