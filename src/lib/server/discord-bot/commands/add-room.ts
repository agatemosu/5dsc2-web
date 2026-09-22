import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import {
	CommandOptionType,
	SlashCommand,
	type CommandContext,
	type MessageOptions,
	type SlashCreator,
} from 'slash-create';

interface Options {
	name: string;
	date: string;
	timezone: string | undefined;
	player: string | undefined;
}

export class AddRoomCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'add-room',
			nameLocalizations: {
				'es-ES': 'añadir-sala',
			},
			description: 'Adds a room to the qualifier room list.',
			descriptionLocalizations: {
				'es-ES': 'Añade una sala a la lista de salas de clasificación.',
			},
			guildIDs: env.DISCORD_GUILD_ID,
			options: [
				{
					type: CommandOptionType.STRING,
					name: 'name',
					name_localizations: {
						'es-ES': 'nombre',
					},
					description: 'Room name',
					description_localizations: {
						'es-ES': 'Nombre de la sala',
					},
					required: true,
				},
				{
					type: CommandOptionType.STRING,
					name: 'date',
					name_localizations: {
						'es-ES': 'fecha',
					},
					description: 'Room date',
					description_localizations: {
						'es-ES': 'Fecha de la sala',
					},
					required: true,
				},
				{
					type: CommandOptionType.STRING,
					name: 'timezone',
					name_localizations: {
						'es-ES': 'zona-horaria',
					},
					description: 'The time zone for the date, by default Europe/Madrid',
					description_localizations: {
						'es-ES': 'La zona horaria de la fecha, por defecto Europe/Madrid',
					},
				},
				{
					type: CommandOptionType.USER,
					name: 'player',
					name_localizations: {
						'es-ES': 'jugador',
					},
					description: 'Add a player to the room',
					description_localizations: {
						'es-ES': 'Añadir un jugador a la sala',
					},
				},
			],
		});
	}

	async run(ctx: CommandContext): Promise<string | MessageOptions> {
		const options = ctx.options as Options;

		if (!ctx.member!.roles.includes(env.DISCORD_REFEREE_ROLE_ID)) {
			return 'No tienes permiso para usar este comando.';
		}

		if (options.timezone !== undefined) {
			const timezones = Intl.supportedValuesOf('timeZone');
			const supportsTimezone = timezones.includes(options.timezone);
			if (!supportsTimezone) {
				return 'Zona horaria inválida.';
			}
		}

		const zdt = Temporal.ZonedDateTime.from(
			`${options.date}[${options.timezone ?? 'Europe/Madrid'}]`,
		);

		let player: Pick<table.Player, 'id'> | undefined;
		if (options.player !== undefined) {
			player = await db.query.players.findFirst({
				where: {
					user: {
						discordId: options.player,
					},
				},
				columns: { id: true },
			});
		}

		if (options.player !== undefined && player === undefined) {
			return 'Jugador no encontrado.';
		}

		const result = await db.transaction(async (tx) => {
			const [insertResult] = await tx
				.insert(table.qualifierRooms)
				.values({
					id: options.name,
					startTime: zdt.toInstant(),
				})
				.onConflictDoNothing()
				.returning();

			if (insertResult === undefined) {
				return {
					error: `Ya hay una sala con nombre ${options.name}.`,
				};
			}

			if (player !== undefined) {
				await tx
					.update(table.players)
					.set({
						qualifierRoomId: insertResult.id,
					})
					.where(eq(table.players.id, player.id));
			}

			return { error: null };
		});

		if (result.error !== null) {
			return result.error;
		}

		return (
			`Nueva sala ${options.name} creada para <t:${zdt.epochMilliseconds / 1000}:F>.` +
			(options.player === undefined ? '' : ` Añadido a <@${options.player}>.`)
		);
	}
}
