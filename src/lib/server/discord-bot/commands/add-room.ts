import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { CommandContext, CommandOptionType, SlashCommand, SlashCreator } from 'slash-create';

interface Options {
	name: string;
	date: string;
	timezone: string | undefined;
}

export class AddRoomCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'add-room',
			nameLocalizations: {
				'es-ES': 'añadir-sala',
			},
			description: "Adds a room to the tournament's qualifier room list.",
			descriptionLocalizations: {
				'es-ES': 'Añade una sala a las lista de salas de clasificación del torneo.',
			},
			guildIDs: env.DISCORD_GUILD_ID,
			options: [
				{
					required: true,
					type: CommandOptionType.STRING,
					name: 'name',
					name_localizations: {
						'es-ES': 'nombre',
					},
					description: 'Room name',
					description_localizations: {
						'es-ES': 'Nombre de la sala',
					},
				},
				{
					required: true,
					type: CommandOptionType.STRING,
					name: 'date',
					name_localizations: {
						'es-ES': 'fecha',
					},
					description: 'Room date',
					description_localizations: {
						'es-ES': 'Fecha de la sala',
					},
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
			],
		});
	}

	async run(ctx: CommandContext) {
		const options = ctx.options as Options;

		if (!ctx.member!.roles.includes(env.DISCORD_REFEREE_ROLE_ID)) {
			ctx.send('No tienes permiso para usar este comando.');
		}

		if (options.timezone !== undefined) {
			const timezones = Intl.supportedValuesOf('timeZone');
			const supportsTimezone = timezones.includes(options.timezone);
			if (!supportsTimezone) {
				ctx.send('Zona horaria inválida.');
				return;
			}
		}

		const zdt = Temporal.ZonedDateTime.from(
			`${options.date}[${options.timezone ?? 'Europe/Madrid'}]`,
		);

		const insertResult = await db
			.insert(table.qualifierRooms)
			.values({
				id: options.name,
				startTime: new Date(zdt.epochMilliseconds),
			})
			.onConflictDoNothing()
			.returning();

		if (insertResult.length === 0) {
			ctx.send(`Ya hay una sala con nombre ${options.name}.`);
			return;
		}

		ctx.send(`Nueva sala ${options.name} creada para <t:${zdt.epochMilliseconds / 1000}:F>.`);
	}
}
