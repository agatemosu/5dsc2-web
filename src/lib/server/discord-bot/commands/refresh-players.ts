import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { osuApi } from '$lib/server/osu';
import { sql } from 'drizzle-orm';
import {
	CommandOptionType,
	SlashCommand,
	type CommandContext,
	type Member,
	type MessageOptions,
	type SlashCreator,
} from 'slash-create';

interface Options {
	refresh_global_ranks?: boolean;
}

export class RefreshPlayersCommand extends SlashCommand {
	readonly osuBatchLimit = 50;

	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'refresh-players',
			nameLocalizations: {
				'es-ES': 'refrescar-jugadores',
			},
			description: 'Refresh player data from osu!.',
			descriptionLocalizations: {
				'es-ES': 'Actualiza los datos de los jugadores desde osu!.',
			},
			guildIDs: env.DISCORD_GUILD_ID,
			options: [
				{
					type: CommandOptionType.BOOLEAN,
					name: 'refresh_global_ranks',
					name_localizations: {
						'es-ES': 'refrescar_clasificación_global',
					},
					description: "Also refresh players' global rankings",
					description_localizations: {
						'es-ES': 'Actualiza también las clasificaciones globales de los jugadores',
					},
				},
			],
		});
	}

	async run(ctx: CommandContext): Promise<string | MessageOptions> {
		const options = ctx.options as Options;

		const isRef = (ctx.member as Member).roles.includes(env.DISCORD_REFEREE_ROLE_ID);
		const isStaff = (ctx.member as Member).roles.includes(env.DISCORD_STAFF_ROLE_ID);

		if (!isRef && !isStaff) {
			return 'No tienes permiso para usar este comando.';
		}

		if (options.refresh_global_ranks && !isStaff) {
			return 'No tienes permiso para refrescar las clasificaciones.';
		}

		const players = await db.query.users.findMany({
			where: { player: true },
			columns: { osuId: true },
		});

		const osuIds = players.map((player) => player.osuId);

		if (osuIds.length === 0) {
			return 'No hay jugadores para actualizar.';
		}

		const users = await Promise.all(
			Array.from({ length: Math.ceil(osuIds.length / this.osuBatchLimit) }, (_, i) =>
				osuApi.getUsers(osuIds.slice(i * this.osuBatchLimit, (i + 1) * this.osuBatchLimit)),
			),
		);

		const insertUsers = users.flat().map((user) => {
			return {
				id: user.id,
				username: user.username,
				globalRank: user.statistics_rulesets.osu?.global_rank ?? 0,
				countryRank: 0,
			} satisfies table.OsuUser;
		});

		await db
			.insert(table.osuUsers)
			.values(insertUsers)
			.onConflictDoUpdate({
				target: table.osuUsers.id,
				set: {
					username: sql`excluded.username`,
					globalRank:
						options.refresh_global_ranks === true
							? sql`case when excluded.global_rank = 0 then ${table.osuUsers.globalRank} else excluded.global_rank end`
							: undefined,
				},
			});

		const rankPart = options.refresh_global_ranks ? ' y las clasificaciones globales' : '';

		return `Actualizados los nombres de usuario${rankPart} de osu! de los jugadores.`;
	}
}
