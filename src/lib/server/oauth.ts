import { env } from '$env/dynamic/private';
import * as arctic from 'arctic';

export function getOsuClient(urlOrigin: string) {
	return new arctic.Osu(
		env.OSU_CLIENT_ID!,
		env.OSU_CLIENT_SECRET!,
		`${urlOrigin}/auth/osu/callback`,
	);
}

export function getDiscordClient(urlOrigin: string) {
	return new arctic.Discord(
		env.DISCORD_CLIENT_ID!,
		env.DISCORD_CLIENT_SECRET!,
		`${urlOrigin}/auth/discord/callback`,
	);
}
