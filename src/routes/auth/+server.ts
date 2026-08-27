import { getOsuClient } from '$lib/server/oauth';
import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = (event) => {
	const state = generateState();
	const url = getOsuClient(event.url.origin).createAuthorizationURL(state, []);

	event.cookies.set('osu_oauth_state', state, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax',
	});

	return redirect(302, url);
};
