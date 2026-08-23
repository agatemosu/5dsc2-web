import { error, redirect } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import type { OsuUser } from '$lib/interfaces/osu';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';
import { getOsuClient } from '$lib/server/oauth';
import { createUser, getUserByOsuId, refreshOsuUser } from '$lib/server/db/user';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const errorCode = event.url.searchParams.get('error');
	if (errorCode) {
		const errorDescription = event.url.searchParams.get('error_description');
		return error(400, errorDescription ?? 'Vuelve a intentarlo.');
	}

	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('osu_oauth_state');
	if (code == null || state == null || storedState == null || state !== storedState) {
		return error(400, 'Vuelve a intentarlo.');
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await getOsuClient(event.url.origin).validateAuthorizationCode(code);
	} catch {
		// Invalid code or client credentials
		return error(400, 'Vuelve a intentarlo.');
	}

	const osuUserResponse = await fetch('https://osu.ppy.sh/api/v2/me/osu', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`,
		},
	});
	const osuUser: OsuUser = await osuUserResponse.json();

	if (osuUser.country_code !== 'ES') {
		return error(403, 'Debes ser de España para registrarte.');
	}

	const existingUser = await getUserByOsuId(osuUser.id);

	if (existingUser) {
		await refreshOsuUser(osuUser);

		if (event.locals.session?.id == null) {
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, existingUser.id);
			setSessionTokenCookie(event, sessionToken, session.expiresAt);
		}

		return redirect(302, '/register');
	}

	const userId = await createUser(osuUser);

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, userId);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return redirect(302, '/register');
};
