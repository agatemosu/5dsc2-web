import { db } from '$lib/server/db';
import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const players = await db.query.players.findMany({
		where: {
			registeredAt: { isNotNull: true },
		},
		columns: { availability: true },
		with: {
			discord: {
				columns: { username: true },
			},
			osu: {
				columns: { id: true, username: true },
			},
		},
	});

	const rows = ['user_id,team_name,team_availability,username,flag,discord_username'];

	for (const player of players) {
		const { osu, discord } = player;

		rows.push(
			`${osu.id},${osu.username},${player.availability},${osu.username},ES,${discord.username}`,
		);
	}

	return text(rows.join('\n'));
};
