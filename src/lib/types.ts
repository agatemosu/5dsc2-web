import type { OsuUser } from '$lib/interfaces/osu';
import type { Beatmap, Beatmapset, Mappool } from '$lib/server/db/schema';

export type PlayerOnlyOsu = { osu: Pick<OsuUser, 'username'> };

export type FullMappool = Mappool & {
	beatmap: Beatmap & { beatmapset: Beatmapset };
};
