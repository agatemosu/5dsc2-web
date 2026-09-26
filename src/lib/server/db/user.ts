import type { DiscordUser } from '$lib/interfaces/discord';
import type { OsuUser } from '$lib/interfaces/osu';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getUserByOsuId(osuId: number) {
	return await db.query.users.findFirst({
		where: { osuId: osuId },
	});
}

export async function createUser(osuUser: OsuUser) {
	await db.insert(table.osuUsers).values({
		id: osuUser.id,
		username: osuUser.username,
		coverUrl: osuUser.cover.url,
		globalRank: osuUser.statistics.global_rank,
		countryRank: osuUser.statistics.country_rank,
	});

	const [user] = await db
		.insert(table.users)
		.values({
			osuId: osuUser.id,
		})
		.returning({ id: table.users.id });

	return user.id;
}

export async function refreshOsuUser(osuUser: OsuUser, refreshRanks: boolean) {
	await db
		.update(table.osuUsers)
		.set({
			username: osuUser.username,
			coverUrl: osuUser.cover.url,
			globalRank: refreshRanks ? osuUser.statistics.global_rank : undefined,
			countryRank: refreshRanks ? osuUser.statistics.country_rank : undefined,
		})
		.where(eq(table.osuUsers.id, osuUser.id));
}

export async function addDiscordDataToUser(userId: number, discordUser: DiscordUser) {
	await db
		.insert(table.discordUsers)
		.values({
			id: discordUser.id,
			username: discordUser.username,
			globalName: discordUser.global_name,
			avatar: discordUser.avatar,
		})
		.onConflictDoUpdate({
			target: [table.discordUsers.id],
			set: {
				username: discordUser.username,
				globalName: discordUser.global_name,
				avatar: discordUser.avatar,
			},
		});

	await db.update(table.users).set({ discordId: discordUser.id }).where(eq(table.users.id, userId));
}

export async function unlinkDiscord(userId: number) {
	await db.update(table.users).set({ discordId: null }).where(eq(table.users.id, userId));
}

export async function registerUser(userId: number, availability: string) {
	await db
		.insert(table.players)
		.values({ userId, availability, registeredAt: Temporal.Now.instant() })
		.onConflictDoUpdate({
			target: table.players.userId,
			set: { availability },
		});
}
