import { type RequestHandler, error, redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';

import { getDiscordClient } from '$lib/server/oauth';

export const GET: RequestHandler = (event) => {
	if (!event.locals.user) {
		return error(401);
	}

	const state = generateState();
	const url = getDiscordClient(event.url.origin).createAuthorizationURL(state, null, [
		'identify',
		'guilds.join',
	]);

	event.cookies.set('discord_oauth_state', state, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax',
	});

	return redirect(302, url);
};
