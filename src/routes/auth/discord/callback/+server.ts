import type { DiscordUser } from '$lib/interfaces/discord';
import { addDiscordDataToUser } from '$lib/server/db/user';
import { joinUserToServer } from '$lib/server/discord';
import { getDiscordClient } from '$lib/server/oauth';
import { UserError } from '$lib/user-error';
import { type RequestHandler, error, redirect } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';

export const GET: RequestHandler = async (event) => {
	if (!event.locals.user) {
		return error(400, 'No tienes la sesión iniciada.');
	}

	const errorCode = event.url.searchParams.get('error');
	if (errorCode) {
		const errorDescription = event.url.searchParams.get('error_description');
		return error(400, errorDescription ?? 'Vuelve a intentarlo.');
	}

	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('discord_oauth_state');
	if (code == null || state == null || storedState == null || state !== storedState) {
		return error(400, 'Vuelve a intentarlo.');
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await getDiscordClient(event.url.origin).validateAuthorizationCode(code, null);
	} catch (err) {
		console.error('Discord OAuth token exchange failed:', err);

		return error(400, 'Vuelve a intentarlo.');
	}

	const discordUserResponse = await fetch('https://discord.com/api/v10/users/@me', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`,
		},
	});
	const discordUser: DiscordUser = await discordUserResponse.json();
	addDiscordDataToUser(event.locals.user.id, discordUser);

	const joinRes = await joinUserToServer(discordUser.id, tokens.accessToken());
	if (joinRes instanceof UserError) {
		const redirecturl = new URL('/register', event.url.origin);
		redirecturl.searchParams.set('error', joinRes.message);

		return redirect(302, redirecturl);
	}

	return redirect(302, '/register');
};
