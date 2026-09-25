import type { Score } from '$lib/server/db/schema';
import type { PlayerWithOsu, ScoreWithPlayer } from '$lib/types';
import { median, normalizeScore } from './util';

interface SoloStat {
	player: PlayerWithOsu<'id', 'username'>;
	matchCost: number;
	avgScore: number;
	avgAcc: number;
	mapNum: number;
	higestScore: Score;
	scores: ScoreWithPlayer[];
}

export function calcMatchCosts(inputs: ScoreWithPlayer[]): SoloStat[] {
	const normalizedScores = inputs.map(normalizeScore);

	const bestScores = new Map<number, Map<string, number>>();
	for (const score of normalizedScores) {
		let playerPicks = bestScores.get(score.playerId);

		if (!playerPicks) {
			playerPicks = new Map();
			bestScores.set(score.playerId, playerPicks);
		}

		const currentBest = playerPicks.get(score.pick);

		if (currentBest === undefined || score.normalizedScore > currentBest) {
			playerPicks.set(score.pick, score.normalizedScore);
		}
	}

	const pickScores = new Map<string, number[]>();
	for (const picks of bestScores.values()) {
		for (const [pick, score] of picks) {
			let scores = pickScores.get(pick);

			if (!scores) {
				scores = [];
				pickScores.set(pick, scores);
			}

			scores.push(score);
		}
	}

	const pickMedians = new Map<string, number>();
	for (const [pick, scores] of pickScores) {
		pickMedians.set(pick, median(scores));
	}

	const playerMatchCosts = new Map<number, number>();
	for (const [playerId, picks] of bestScores) {
		let total = 0;

		for (const [pick, score] of picks) {
			const pickMedian = pickMedians.get(pick) as number;

			if (pickMedian !== 0) {
				total += score / pickMedian;
			}
		}

		playerMatchCosts.set(playerId, total);
	}

	const mapsPlayed = new Map<number, number>();
	for (const [playerId, picks] of bestScores) {
		mapsPlayed.set(playerId, picks.size);
	}

	const medianMapsPlayed = median([...mapsPlayed.values()]);

	const result: SoloStat[] = [];
	for (const [playerId, totalMatchCost] of playerMatchCosts) {
		const played = mapsPlayed.get(playerId) as number;

		const averageMatchCost = totalMatchCost / played;
		const mapFactor = Math.pow(played / medianMapsPlayed, 1 / 3);
		const matchCost = averageMatchCost * mapFactor;

		const playerScores = normalizedScores.filter((score) => score.player.id === playerId);

		const avgScore =
			playerScores.reduce((sum, score) => sum + score.normalizedScore, 0) / playerScores.length;

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
			mapNum: played,
			higestScore: highestScore,
			scores: playerScores,
		});
	}

	result.sort((a, b) => b.matchCost - a.matchCost);

	return result;
}
