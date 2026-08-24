import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	osuId: integer('osu_id')
		.notNull()
		.unique()
		.references(() => osuUser.id),
	discordId: text('discord_id').references(() => discordUser.id),
});

export const player = sqliteTable('players', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id')
		.notNull()
		.unique()
		.references(() => user.id, { onDelete: 'cascade' }),
	registeredAt: integer('registered_at', { mode: 'timestamp' }).notNull(),
	availability: text('availability').notNull(),
	seed: integer('seed'),
});

export const osuUser = sqliteTable('osu_users', {
	id: integer('id').primaryKey(),
	username: text('username').notNull(),
	globalRank: integer('global_rank').notNull(),
	countryRank: integer('country_rank').notNull(),
});

export const discordUser = sqliteTable('discord_users', {
	id: text('id').primaryKey(),
	username: text('username').notNull(),
	globalName: text('global_name'),
	avatar: text('avatar'),
});

export const session = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

// relations

export const userRelations = relations(user, ({ one }) => ({
	player: one(player),
	osu: one(osuUser, {
		fields: [user.osuId],
		references: [osuUser.id],
	}),
	discord: one(discordUser, {
		fields: [user.discordId],
		references: [discordUser.id],
	}),
}));

export const playerRelations = relations(player, ({ one }) => ({
	user: one(user, {
		fields: [player.userId],
		references: [user.id],
	}),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

// types

export type User = typeof user.$inferSelect;
export type Player = typeof player.$inferSelect;
export type OsuUser = typeof osuUser.$inferSelect;
export type DiscordUser = typeof discordUser.$inferSelect;
export type Session = typeof session.$inferSelect;
