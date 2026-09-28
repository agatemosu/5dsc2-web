import type { Score } from '$lib/server/db/schema';
import type { PlayerWithOsu, ScoreWithPlayer } from '$lib/types';
import { median, normalizeScore } from './util';

interface SoloStat {
	player: PlayerWithOsu<'id', 'username'>;
	matchCost: number;
	avgScore: number;
	avgAcc: number;
	mapNum: number;
	highestScore: Score;
	scores: ScoreWithPlayer[];
}

export function calcMatchCosts(inputs: ScoreWithPlayer[]): SoloStat[] {
	const normalizedScores = inputs.map(normalizeScore);

	// Group scores by player.
	const scoresByPlayer = Map.groupBy(normalizedScores, (score) => score.player.id);

	// For each player, get the maximum normalized score for every pick.
	const bestByPlayer = new Map<number, Map<string, number>>();

	// Also collect all players' map counts.
	const mapCounts: number[] = [];

	for (const [playerId, scores] of scoresByPlayer) {
		mapCounts.push(scores.length);

		const bestByPick = new Map<string, number>();
		for (const score of scores) {
			const previous = bestByPick.get(score.pick);

			if (previous === undefined || score.normalizedScore > previous) {
				bestByPick.set(score.pick, score.normalizedScore);
			}
		}

		bestByPlayer.set(playerId, bestByPick);
	}

	const medianMapCount = median(mapCounts);

	// Calculate the median best score for each pick.
	const medianByPick = new Map<string, number[]>();
	for (const bestByPick of bestByPlayer.values()) {
		for (const [pick, score] of bestByPick) {
			let scores = medianByPick.get(pick);

			if (!scores) {
				scores = [];
				medianByPick.set(pick, scores);
			}

			scores.push(score);
		}
	}

	const pickMedians = new Map<string, number>();
	for (const [pick, scores] of medianByPick) {
		pickMedians.set(pick, median(scores));
	}

	const result: SoloStat[] = [];
	for (const [playerId, playerScores] of scoresByPlayer) {
		const bestByPick = bestByPlayer.get(playerId) as Map<string, number>;

		let pickCostSum = 0;

		for (const [pick, bestScore] of bestByPick) {
			const pickMedian = pickMedians.get(pick) as number;

			if (pickMedian !== 0) {
				pickCostSum += bestScore / pickMedian;
			}
		}

		const matchCost =
			(pickCostSum / playerScores.length) * Math.pow(playerScores.length / medianMapCount, 1 / 3);

		const avgScore =
			[...bestByPick.values()].reduce((sum, score) => sum + score, 0) / bestByPick.size;

		const avgAcc =
			playerScores.reduce((sum, score) => sum + score.accuracy, 0) / playerScores.length;

		const highestScore = playerScores.reduce((highest, score) =>
			score.score > highest.score ? score : highest,
		);

		result.push({
			player: highestScore.player,
			matchCost,
			avgScore,
			avgAcc,
			mapNum: playerScores.length,
			highestScore,
			scores: playerScores,
		});
	}

	result.sort((a, b) => b.matchCost - a.matchCost);

	return result;
}
