import type { Score } from '$lib/server/db/schema';

interface QualifierStat {
	playerId: number;
	zSum: number;
	avgScore: number;
	scores: Score[];
}

export function calcZsums(scores: Score[]): QualifierStat[] {
	const mapGroups = new Map<string, number[]>();
	for (const score of scores) {
		if (!mapGroups.has(score.pick)) {
			mapGroups.set(score.pick, []);
		}
		mapGroups.get(score.pick)!.push(score.score);
	}

	const mapStats = new Map<string, { average: number; stdDev: number }>();
	for (const [pick, values] of mapGroups) {
		const average = values.reduce((a, b) => a + b, 0) / values.length;
		const sumOfSquares = values.reduce((sum, val) => sum + Math.pow(val - average, 2), 0);
		const stdDev = values.length > 0 ? Math.sqrt(sumOfSquares / values.length) : 0;

		mapStats.set(pick, { average, stdDev });
	}

	const playerScores = Map.groupBy(scores, (score) => score.playerId);

	const playerStats: QualifierStat[] = [];
	for (const [playerId, scores] of playerScores) {
		let zSum = 0;
		let totalScore = 0;

		for (const score of scores) {
			const mapStat = mapStats.get(score.pick)!;

			if (mapStat.stdDev > 0) {
				zSum += (score.score - mapStat.average) / mapStat.stdDev;
			}

			totalScore += score.score;
		}

		const stat: QualifierStat = {
			playerId,
			zSum,
			avgScore: totalScore / scores.length,
			scores,
		};

		playerStats.push(stat);
	}

	playerStats.sort((a, b) => b.zSum - a.zSum);

	return playerStats;
}
