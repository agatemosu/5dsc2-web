import { integer, snakeCase, text } from 'drizzle-orm/sqlite-core';

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
	registeredAt: integer({ mode: 'timestamp' }).notNull(),
	availability: text().notNull(),
	seed: integer(),
});

export const osuUsers = snakeCase.table('osu_users', {
	id: integer().primaryKey(),
	username: text().notNull(),
	globalRank: integer().notNull(),
	countryRank: integer().notNull(),
});

export const discordUsers = snakeCase.table('discord_users', {
	id: text().primaryKey(),
	username: text().notNull(),
	globalName: text(),
	avatar: text(),
});

export const sessions = snakeCase.table('sessions', {
	id: text().primaryKey(),
	userId: integer()
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: integer({ mode: 'timestamp' }).notNull(),
});

// types

export type User = typeof users.$inferSelect;
export type Player = typeof players.$inferSelect;
export type OsuUser = typeof osuUsers.$inferSelect;
export type DiscordUser = typeof discordUsers.$inferSelect;
export type Session = typeof sessions.$inferSelect;
