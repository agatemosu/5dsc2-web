import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import * as csv from 'csv-parse/sync';
import { DrizzleQueryError } from 'drizzle-orm';
import { CommandContext, CommandOptionType, SlashCommand, SlashCreator } from 'slash-create';
import { z } from 'zod';

interface Options {
	file: string;
}

const fileSchema = z.array(
	z.object({
		name: z.string(),
		date: z.string().transform((val) => Temporal.ZonedDateTime.from(val)),
	}),
);

export class AddRoomBulkCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'add-rooms-bulk',
			nameLocalizations: {
				'es-ES': 'añadir-salas-en-bloque',
			},
			description: 'Adds various rooms to the qualifier room list.',
			descriptionLocalizations: {
				'es-ES': 'Añade varias salas a las lista de salas de clasificación.',
			},
			guildIDs: env.DISCORD_GUILD_ID,
			options: [
				{
					type: CommandOptionType.ATTACHMENT,
					name: 'file',
					name_localizations: {
						'es-ES': 'archivo',
					},
					description: 'CSV file containing the name and date for each room',
					description_localizations: {
						'es-ES': 'Archivo CSV que contiene el name y la date de cada sala',
					},
					required: true,
				},
			],
		});
	}

	async run(ctx: CommandContext) {
		const options = ctx.options as Options;

		if (!ctx.member!.roles.includes(env.DISCORD_REFEREE_ROLE_ID)) {
			ctx.send('No tienes permiso para usar este comando.');
			return;
		}

		const attachment = ctx.attachments.get(options.file)!;

		if (!attachment.content_type!.includes('text/csv')) {
			ctx.send('No es un archivo CSV.');
			return;
		}

		if (attachment.size > 4000) {
			ctx.send(`Archivo muy grande: ${attachment.size} B > 4000 B`);
			return;
		}

		const response = await fetch(attachment.url);
		const content = await response.bytes();

		const fileData = csv.parse(content, {
			columns: true,
			skip_empty_lines: true,
			trim: true,
		});

		const result = fileSchema.safeParse(fileData);

		if (!result.success) {
			ctx.send('Formato inválido.');
			return;
		}

		const roomsToInsert = result.data.map((row) => {
			return {
				id: row.name,
				startTime: new Date(Temporal.ZonedDateTime.from(row.date).epochMilliseconds),
			} satisfies typeof table.qualifierRooms.$inferInsert;
		});

		try {
			await db.insert(table.qualifierRooms).values(roomsToInsert);
		} catch (e) {
			if (e instanceof DrizzleQueryError) {
				const failedToAdd = e.params.filter((n) => n % 2 !== 0).join(', ');
				ctx.send(
					`Se ha cancelado la adición de todas las salas porque las siguientes ya existen: ${failedToAdd}.`,
				);
				return;
			}
		}

		ctx.send(`Se han añadido las salas proporcionadas.`);
	}
}
