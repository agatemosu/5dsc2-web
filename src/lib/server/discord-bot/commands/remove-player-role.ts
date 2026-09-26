import { env } from '$env/dynamic/private';
import { MAX_QUALIFIED_SEED } from '$lib/consts';
import { db } from '$lib/server/db';
import {
	SlashCommand,
	type CommandContext,
	type Member,
	type MessageOptions,
	type SlashCreator,
} from 'slash-create';

export class RemovePlayerRoleCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'remove-player-role',
			nameLocalizations: {
				'es-ES': 'eliminar-rol-jugador',
			},
			description: 'Remove player role from not qualified players.',
			descriptionLocalizations: {
				'es-ES': 'Elimina el rol de jugador a los jugadores no clasificados.',
			},
			guildIDs: env.DISCORD_GUILD_ID,
		});
	}

	async run(ctx: CommandContext): Promise<string | MessageOptions> {
		if (!(ctx.member as Member).roles.includes(env.DISCORD_STAFF_ROLE_ID)) {
			return 'No tienes permiso para usar este comando.';
		}

		const players = await db.query.users.findMany({
			where: { player: true, discordId: { isNotNull: true } },
			columns: { discordId: true },
			with: {
				player: {
					columns: { seed: true },
				},
			},
		});

		const discordIds = players
			.filter((player) => player.player?.seed && player.player.seed > MAX_QUALIFIED_SEED)
			.map((player) => player.discordId);

		if (discordIds.length === 0) {
			return 'No hay jugadores para eliminar.';
		}

		const errorIds: string[] = [];
		for (const discordId of discordIds) {
			const response = await fetch(
				`https://discord.com/api/v10/guilds/${env.DISCORD_GUILD_ID}/members/${discordId}/roles/${env.DISCORD_PLAYER_ROLE_ID}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
					},
				},
			);

			if (!response.ok) {
				errorIds.push(discordId as string);
			}
		}

		let text = `Se ha eliminado el rol a ${discordIds.length - errorIds.length} jugador(es).`;

		if (errorIds.length > 0) {
			const mentions = errorIds.map((discordId) => `<@${discordId}>`);
			const listFmt = new Intl.ListFormat('es-ES');
			text += ` No se pudo quitar el rol a ${listFmt.format(mentions)}`;
		}

		return text;
	}
}
