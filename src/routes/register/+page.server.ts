import { encodeAvailability, validateAvailability } from '$lib/availability';
import { dates, isFutureAndProd, isPastAndProd } from '$lib/dates';
import { db } from '$lib/server/db';
import { registerUser, unlinkDiscord } from '$lib/server/db/user';
import { addRoleToUser } from '$lib/server/discord';
import { UserError } from '$lib/user-error';
import { fail } from '@sveltejs/kit';
import { definePageMetaTags } from 'svelte-meta-tags';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const pageTags = definePageMetaTags({
		title: 'Registro',
	});

	const playerData = event.locals.user
		? await db.query.users.findFirst({
				where: { id: event.locals.user.id },
				columns: {},
				with: {
					discord: true,
				},
			})
		: null;

	return {
		playerData,
		...pageTags,
	};
};

export const actions: Actions = {
	register: async (event) => {
		if (event.locals.user?.discordId == null) {
			return fail(401);
		}

		const playerData = await db.query.players.findFirst({
			where: { userId: event.locals.user.id },
			columns: { id: true },
		});

		if (isFutureAndProd(dates.player_regs.start)) {
			return fail(403, { error: 'Aún no se aceptan registros.' });
		}

		if (playerData === undefined && isPastAndProd(dates.qualifiers.end)) {
			return fail(410, { error: 'Ya no se aceptan registros.' });
		}

		const data = await event.request.formData();

		if (!validateAvailability(data)) {
			return fail(400);
		}

		const availability = encodeAvailability(data);
		await registerUser(event.locals.user.id, availability);

		const user = await addRoleToUser(event.locals.user.discordId);
		if (user instanceof UserError) {
			return fail(403, { error: user.message });
		}

		return { success: true };
	},
	unlink: async (event) => {
		if (!event.locals.user?.id) {
			return fail(401);
		}

		const playerData = await db.query.players.findFirst({
			where: { userId: event.locals.user.id },
			columns: { id: true },
		});

		if (playerData !== undefined) {
			return fail(400);
		}

		await unlinkDiscord(event.locals.user.id);
	},
};
