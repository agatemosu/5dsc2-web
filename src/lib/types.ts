import type {
	Beatmap,
	Beatmapset,
	Mappool,
	Match,
	OsuUser,
	Player,
	QualifierRoom,
	Score,
} from '$lib/server/db/schema';

// users
export type PlayerWithOsu<
	PlayerFields extends keyof Player = keyof Player,
	OsuFields extends keyof OsuUser = keyof OsuUser,
> = Pick<Player, PlayerFields> & {
	osu: Pick<OsuUser, OsuFields>;
};

// mappool
export type FullMappool = Mappool & {
	beatmap: Beatmap & { beatmapset: Beatmapset };
};

// qualifier rooms
export type QualifierRoomWithPlayers = QualifierRoom & {
	players: PlayerWithOsu<never, 'username'>[];
};

// matches
export type MatchWithPlayers = Match & {
	red: PlayerWithOsu | null;
	blue: PlayerWithOsu | null;
};

// stats
export type ScoreWithPlayer = Score & { player: PlayerWithOsu<'id', 'username'> };
export type NormalizedScoreWithPlayer = ScoreWithPlayer & { normalizedScore: number };
