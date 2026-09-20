import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, userId: number) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: table.Session = {
		id: sessionId,
		userId,
		expiresAt: Temporal.Now.instant().add({ hours: 30 * 24 }),
	};
	await db.insert(table.sessions).values(session);
	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const result = await db.query.sessions.findFirst({
		where: { id: sessionId },
		with: {
			user: {
				with: { osu: true, player: true },
			},
		},
	});

	if (!result) {
		return { session: null, user: null };
	}
	const { user, ...session } = result;

	const now = Temporal.Now.instant();

	const sessionExpired = Temporal.Instant.compare(now, session.expiresAt) >= 0;
	if (sessionExpired) {
		await invalidateSession(session.id);
		return { session: null, user: null };
	}

	const renewAt = session.expiresAt.subtract({ hours: 15 * 24 });
	const renewSession = Temporal.Instant.compare(now, renewAt) >= 0;
	if (renewSession) {
		session.expiresAt = now.add({ hours: 30 * 24 });
		await db
			.update(table.sessions)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.sessions.id, session.id));
	}

	return { session, user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(table.sessions).where(eq(table.sessions.id, sessionId));
}

export function setSessionTokenCookie(
	event: RequestEvent,
	token: string,
	expiresAt: Temporal.Instant,
) {
	event.cookies.set(sessionCookieName, token, {
		expires: new Date(expiresAt.epochMilliseconds),
		path: '/',
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/',
	});
}
