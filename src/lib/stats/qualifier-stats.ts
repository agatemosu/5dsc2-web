import type { NormalizedScoreWithPlayer, PlayerWithOsu, ScoreWithPlayer } from '$lib/types';
import { normalizeScore } from './util';

interface QualifierStat {
	player: PlayerWithOsu<'id', 'username'>;
	zSum: number;
	avgScore: number;
	scores: NormalizedScoreWithPlayer[];
}

interface MapStat {
	average: number;
	stdDev: number;
}

export function calcZsums(inputs: ScoreWithPlayer[]): QualifierStat[] {
	const normalizedScores = inputs.map(normalizeScore);

	const mapGroups = new Map<string, number[]>();
	for (const score of normalizedScores) {
		const group = mapGroups.get(score.pick);

		if (group) {
			group.push(score.score);
		} else {
			mapGroups.set(score.pick, [score.score]);
		}
	}

	const mapStats = new Map<string, MapStat>();
	for (const [pick, values] of mapGroups) {
		const average = values.reduce((a, b) => a + b, 0) / values.length;
		const sumOfSquares = values.reduce((sum, val) => sum + Math.pow(val - average, 2), 0);
		const stdDev = values.length > 0 ? Math.sqrt(sumOfSquares / values.length) : 0;

		mapStats.set(pick, { average, stdDev });
	}

	const playerScores = Map.groupBy(normalizedScores, (score) => score.player.id);

	const playerStats: QualifierStat[] = [];
	for (const scores of playerScores.values()) {
		const player = scores[0].player;

		let zSum = 0;
		let totalScore = 0;

		for (const score of scores) {
			const mapStat = mapStats.get(score.pick) as MapStat;

			if (mapStat.stdDev > 0) {
				zSum += (score.score - mapStat.average) / mapStat.stdDev;
			}

			totalScore += score.normalizedScore;
		}

		const stat: QualifierStat = {
			player,
			zSum,
			avgScore: totalScore / scores.length,
			scores,
		};

		playerStats.push(stat);
	}

	playerStats.sort((a, b) => b.zSum - a.zSum);

	return playerStats;
}
