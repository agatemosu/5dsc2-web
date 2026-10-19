import type { FullMappool, ScoreWithPlayer } from '#lib/types.ts';

interface SoloStat {
	map: FullMappool;
	scores: ScoreWithPlayer[];
}

export function groupMapScores(scores: ScoreWithPlayer[], maps: FullMappool[]): SoloStat[] {
	const scoreGroups = Map.groupBy(
		scores.toSorted((a, b) => b.score - a.score),
		(score) => score.pick,
	);

	const result: SoloStat[] = [];

	for (const map of maps) {
		const pick = map.slotName === 'TB' ? mod.slotName : `${map.slotName}${map.slotIndex}`;
		const scores = scoreGroups.get(pick);

		if (!scores || scores.length === 0) {
			continue;
		}

		result.push({
			map,
			scores: scores,
		});
	}

	return result;
}
