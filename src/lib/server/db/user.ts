import type { DiscordUser } from '$lib/interfaces/discord';
import type { OsuUser } from '$lib/interfaces/osu';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getUserByOsuId(osuId: number) {
	const [result] = await db.select().from(table.user).where(eq(table.user.osuId, osuId));
	return result;
}

export async function upsertOsuTeam(osuTeam: OsuUser['team']) {
	if (osuTeam === null) return;

	await db
		.insert(table.osuTeam)
		.values({
			id: osuTeam.id,
			name: osuTeam.name,
			shortName: osuTeam.short_name,
			flagUrl: osuTeam.flag_url,
		})
		.onConflictDoUpdate({
			target: [table.osuTeam.id],
			set: {
				name: osuTeam.name,
				shortName: osuTeam.short_name,
				flagUrl: osuTeam.flag_url,
			},
		});
}

export async function createUser(osuUser: OsuUser) {
	await upsertOsuTeam(osuUser.team);

	await db.insert(table.osuUser).values({
		id: osuUser.id,
		username: osuUser.username,
		globalRank: osuUser.statistics.global_rank,
		countryRank: osuUser.statistics.country_rank,
		teamId: osuUser.team?.id,
	});

	const [user] = await db
		.insert(table.user)
		.values({
			osuId: osuUser.id,
		})
		.returning({ id: table.user.id });

	return user.id;
}

export async function refreshOsuUser(osuUser: OsuUser) {
	await upsertOsuTeam(osuUser.team);

	await db
		.update(table.osuUser)
		.set({
			username: osuUser.username,
			globalRank: osuUser.statistics.global_rank,
			countryRank: osuUser.statistics.country_rank,
			teamId: osuUser.team?.id ?? null,
		})
		.where(eq(table.osuUser.id, osuUser.id));
}

export async function addDiscordDataToUser(userId: number, discordUser: DiscordUser) {
	await db
		.insert(table.discordUser)
		.values({
			id: discordUser.id,
			username: discordUser.username,
			globalName: discordUser.global_name,
			avatar: discordUser.avatar,
		})
		.onConflictDoUpdate({
			target: [table.discordUser.id],
			set: {
				username: discordUser.username,
				globalName: discordUser.global_name,
				avatar: discordUser.avatar,
			},
		});

	await db.update(table.user).set({ discordId: discordUser.id }).where(eq(table.user.id, userId));
}

export async function unlinkDiscord(userId: number) {
	await db.update(table.user).set({ discordId: null }).where(eq(table.user.id, userId));
}

export async function registerUser(userId: number, availability: string) {
	await db
		.insert(table.player)
		.values({ userId, availability, registeredAt: new Date() })
		.onConflictDoUpdate({
			target: table.player.userId,
			set: { availability },
		});
}
