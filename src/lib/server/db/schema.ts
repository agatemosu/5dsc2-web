import type { DraftEntry, Grade, MatchStatus, Mod, StageType } from '$lib/enums';
import { integer, real, snakeCase, text, unique } from 'drizzle-orm/sqlite-core';
import { instant } from './timestamp';

export const users = snakeCase.table('users', {
	id: integer().primaryKey({ autoIncrement: true }),
	osuId: integer()
		.notNull()
		.unique()
		.references(() => osuUsers.id),
	discordId: text().references(() => discordUsers.id),
});

export const players = snakeCase.table('players', {
	id: integer().primaryKey({ autoIncrement: true }),
	userId: integer()
		.notNull()
		.unique()
		.references(() => users.id, { onDelete: 'cascade' }),
	registeredAt: instant().notNull(),
	availability: text().notNull(),
	qualifierRoomId: text('qualifier_room_id').references(() => qualifierRooms.id, {
		onUpdate: 'cascade',
		onDelete: 'set null',
	}),
	seed: integer(),
});

export const osuUsers = snakeCase.table('osu_users', {
	id: integer().primaryKey(),
	username: text().notNull(),
	coverUrl: text(),
	globalRank: integer().notNull(),
	countryRank: integer().notNull(),
});

export const discordUsers = snakeCase.table('discord_users', {
	id: text().primaryKey(),
	username: text().notNull(),
	globalName: text(),
	avatar: text(),
});

export const qualifierRooms = snakeCase.table('qualifier_rooms', {
	id: text().primaryKey(),
	startTime: instant().notNull(),
	mpLinkId: integer(),
	refereeName: text(),
});

export const leagueLeaderboard = snakeCase.table('league_leaderboard', {
	userId: integer()
		.primaryKey()
		.references(() => players.userId),
	wins: integer().notNull(),
	draws: integer().notNull(),
	losses: integer().notNull(),
	difference: integer().notNull(),
	points: integer().notNull(),
});

export const rounds = snakeCase.table('rounds', {
	id: integer().primaryKey({ autoIncrement: true }),
	slug: text().notNull().unique(),
	name: text().notNull(),
	stageType: text().$type<StageType>().notNull(),
	bestOf: integer(),
	mappackUrl: text(),
	mappoolPublishedAt: instant(),
});

export const matches = snakeCase.table('matches', {
	id: text().primaryKey(),
	roundId: integer()
		.notNull()
		.references(() => rounds.id),
	bracket: text(),
	status: text().$type<MatchStatus>().notNull(),
	startTime: instant().notNull(),
	teamRedId: integer().references(() => players.id),
	teamBlueId: integer().references(() => players.id),
	teamRedPoints: integer(),
	teamBluePoints: integer(),
	rundown: text({ mode: 'json' }).$type<DraftEntry[]>().notNull(),
	refereeName: text(),
	osuMatchId: integer(),
});

export const scores = snakeCase.table(
	'scores',
	{
		id: integer().primaryKey({ autoIncrement: true }),
		roundId: integer()
			.notNull()
			.references(() => rounds.id),
		eventId: integer().notNull(),
		playerId: integer()
			.notNull()
			.references(() => players.id),
		pick: text().notNull(),
		score: integer().notNull(),
		accuracy: real().notNull(),
		grade: text().$type<Grade>().notNull(),
		modsBitset: integer().notNull(),
	},
	(t) => [unique('scores_event_id_player_id_unique').on(t.eventId, t.playerId)],
);

export const mappools = snakeCase.table(
	'mappools',
	{
		id: integer().primaryKey({ autoIncrement: true }),
		roundId: integer()
			.notNull()
			.references(() => rounds.id),
		slotName: text().$type<Mod>().notNull(),
		slotIndex: integer().notNull(),
		beatmapId: integer()
			.notNull()
			.references(() => beatmaps.id),
		custom: integer({ mode: 'boolean' }).default(false).notNull(),
		suggestor: text().notNull(),
		poolerNotes: text().notNull(),
		starRating: real().notNull(),
	},
	(t) => [
		unique('mappools_round_id_slot_name_slot_index_unique').on(t.roundId, t.slotName, t.slotIndex),
	],
);

export const beatmaps = snakeCase.table('beatmaps', {
	id: integer().primaryKey(),
	beatmapsetId: integer()
		.notNull()
		.references(() => beatmapsets.id),
	circleSize: real().notNull(),
	approachRate: real().notNull(),
	overallDifficulty: real().notNull(),
	length: integer().notNull(),
	bpm: real().notNull(),
	version: text().notNull(),
});

export const beatmapsets = snakeCase.table('beatmapsets', {
	id: integer().primaryKey(),
	artist: text().notNull(),
	creator: text().notNull(),
	title: text().notNull(),
});

export const sessions = snakeCase.table('sessions', {
	id: text().primaryKey(),
	userId: integer()
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: instant().notNull(),
});

// types

export type User = typeof users.$inferSelect;
export type Player = typeof players.$inferSelect;
export type OsuUser = typeof osuUsers.$inferSelect;
export type DiscordUser = typeof discordUsers.$inferSelect;
export type QualifierRoom = typeof qualifierRooms.$inferSelect;
export type LeagueLeaderboard = typeof leagueLeaderboard.$inferSelect;
export type Round = typeof rounds.$inferSelect;
export type Match = typeof matches.$inferSelect;
export type Score = typeof scores.$inferSelect;
export type Mappool = typeof mappools.$inferSelect;
export type Beatmap = typeof beatmaps.$inferSelect;
export type Beatmapset = typeof beatmapsets.$inferSelect;
export type Session = typeof sessions.$inferSelect;
