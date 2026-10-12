import { Mod } from '#lib/enums.ts';
import { fromLegacyBitset } from '#lib/mods/bitset.ts';
import type { NormalizedScoreWithPlayer, ScoreWithPlayer } from '#lib/types.ts';

export function median(values: number[]): number {
	if (values.length === 0) {
		return 0;
	}

	const sorted = values.toSorted((a, b) => a - b);
	const middle = Math.floor(sorted.length / 2);

	return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
}

export function normalizeScore(score: ScoreWithPlayer): NormalizedScoreWithPlayer {
	const mods = fromLegacyBitset(score.modsBitset);

	let multiplier = 1;

	for (const mod of mods) {
		switch (mod) {
			case Mod.HD:
				multiplier *= 1.06;
				break;

			case Mod.HR:
				multiplier *= 1.1;
				break;

			case Mod.DT:
				multiplier *= 1.2;
				break;
		}
	}

	return {
		...score,
		normalizedScore: score.score / multiplier,
	};
}
