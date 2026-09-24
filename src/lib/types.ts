import type { OsuUser } from '$lib/interfaces/osu';
import type { Beatmap, Beatmapset, Mappool, Player, Score } from '$lib/server/db/schema';

export type FullMappool = Mappool & {
	beatmap: Beatmap & { beatmapset: Beatmapset };
};

export type PlayerOnlyOsu = Pick<Player, 'id'> & { osu: Pick<OsuUser, 'username'> };

export type ScoreWithPlayer = Score & { player: PlayerOnlyOsu };

export type NormalizedScoreWithPlayer = ScoreWithPlayer & { normalizedScore: number };
