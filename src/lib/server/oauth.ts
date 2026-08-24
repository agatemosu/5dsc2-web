import { env } from '$env/dynamic/private';
import * as arctic from 'arctic';

export function getOsuClient(urlOrigin: string) {
	const clientId = env.OSU_CLIENT_ID;
	const clientSecret = env.OSU_CLIENT_SECRET;

	console.log({
		hasClientId: !!clientId,
		hasClientSecret: !!clientSecret,
		redirectUri: `${urlOrigin}/auth/osu/callback`,
	});

	if (!clientId || !clientSecret) {
		throw new Error('osu! OAuth environment variables are missing');
	}

	return new arctic.Osu(
		clientId,
		clientSecret,
		`${urlOrigin}/auth/osu/callback`,
	);
}

export function getDiscordClient(urlOrigin: string) {
	const clientId = env.DISCORD_CLIENT_ID;
	const clientSecret = env.DISCORD_CLIENT_SECRET;

	console.log({
		hasClientId: !!clientId,
		hasClientSecret: !!clientSecret,
		redirectUri: `${urlOrigin}/auth/discord/callback`,
	});

	if (!clientId || !clientSecret) {
		throw new Error('Discord OAuth environment variables are missing');
	}

	return new arctic.Discord(
		clientId,
		clientSecret,
		`${urlOrigin}/auth/discord/callback`,
	);
}
