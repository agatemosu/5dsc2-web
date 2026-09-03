import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import {
	AutocompleteContext,
	CommandContext,
	CommandOptionType,
	SlashCommand,
	SlashCreator,
	type AutocompleteChoice,
	type MessageOptions,
} from 'slash-create';

interface Options {
	name: string;
}

export class DeleteRoomCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'delete-room',
			nameLocalizations: {
				'es-ES': 'eliminar-sala',
			},
			description: 'Deletes a room from the qualifier room list.',
			descriptionLocalizations: {
				'es-ES': 'Elimina una sala de la lista de salas de clasificación.',
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
					autocomplete: true,
				},
			],
		});
	}

	async autocomplete(ctx: AutocompleteContext): Promise<AutocompleteChoice[]> {
		if (!ctx.member!.roles.includes(env.DISCORD_REFEREE_ROLE_ID)) {
			return [];
		}

		switch (ctx.focused as keyof Options) {
			case 'name': {
				const value = ctx.options[ctx.focused] as string;

				const rooms = await db.query.qualifierRooms.findMany({
					where: {
						id: {
							like: value !== '' ? `${value}%` : undefined,
						},
					},
					columns: { id: true },
					limit: 25,
				});

				return rooms.map((room) => ({
					name: room.id,
					value: room.id,
				}));
			}
		}
	}

	async run(ctx: CommandContext): Promise<string | MessageOptions> {
		const options = ctx.options as Options;

		if (!ctx.member!.roles.includes(env.DISCORD_REFEREE_ROLE_ID)) {
			return 'No tienes permiso para usar este comando.';
		}

		const deleteResult = await db
			.delete(table.qualifierRooms)
			.where(eq(table.qualifierRooms.id, options.name));

		if (deleteResult.rowsAffected === 0) {
			return `La sala ${options.name} no existe.`;
		}

		return `Se ha eliminado la sala ${options.name}.`;
	}
}
