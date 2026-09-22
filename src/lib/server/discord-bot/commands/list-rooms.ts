import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import {
	ButtonStyle,
	ComponentType,
	SlashCommand,
	type AnyComponent,
	type BaseInteractionContext,
	type CommandContext,
	type MessageEmbedOptions,
	type MessageOptions,
	type SlashCreator,
} from 'slash-create';

enum Action {
	Previous,
	Next,
}

export class ListRoomsCommand extends SlashCommand {
	readonly pageSize = 5;

	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'list-rooms',
			nameLocalizations: {
				'es-ES': 'listar-salas',
			},
			description: 'Lists all qualifier rooms.',
			descriptionLocalizations: {
				'es-ES': 'Lista todas las salas de clasificación.',
			},
			guildIDs: env.DISCORD_GUILD_ID,
		});

		creator.on('componentInteraction', async (ctx) => {
			const parsed = this.parseCustomId(ctx.customID);

			if (parsed === null || ctx.user.id !== parsed.userId) {
				return;
			}

			const roomCount = await db.$count(table.qualifierRooms);

			if (roomCount === 0) {
				await ctx.editParent('No hay ninguna sala registrada.');
				return;
			}

			const totalPages = Math.ceil(roomCount / this.pageSize);
			const listFormatter = new Intl.ListFormat(ctx.locale);

			const newPage = Math.max(
				0,
				Math.min(parsed.page + (parsed.action === Action.Previous ? -1 : 1), totalPages - 1),
			);

			await ctx.editParent({
				embeds: [await this.createEmbed(newPage, totalPages, listFormatter)],
				components: this.createComponents(ctx, newPage, totalPages),
			});
		});
	}

	createCustomId = (action: Action, userId: string, page: number) =>
		`${this.commandName}:${action}:${userId}:${page}`;

	parseCustomId = (customId: string): { action: Action; userId: string; page: number } | null => {
		const parts = customId.split(':');
		if (parts.length !== 4) {
			return null;
		}
		const [prefix, actionString, userId, pageString] = parts;
		if (prefix !== this.commandName) {
			return null;
		}
		const action = Number(actionString);
		if (!Number.isInteger(action) || !Object.values(Action).includes(action)) {
			return null;
		}
		const page = Number(pageString);
		if (!Number.isInteger(page) || page < 0) {
			return null;
		}
		return { action, userId, page };
	};

	getRooms = (page: number) => {
		return db.query.qualifierRooms.findMany({
			orderBy: {
				startTime: 'asc',
			},
			limit: this.pageSize,
			offset: page * this.pageSize,
			with: {
				players: {
					columns: {},
					with: {
						osu: {
							columns: { username: true },
						},
					},
				},
			},
		});
	};

	createEmbed = async (
		page: number,
		totalPages: number,
		listFormatter: Intl.ListFormat,
	): Promise<MessageEmbedOptions> => {
		const rooms = await this.getRooms(page);

		const content = rooms
			.map((room) => {
				const timestamp = Math.floor(room.startTime.epochMilliseconds / 1000);
				const players = room.players.map((p) => p.osu.username);

				const playerText = players.length
					? `👤 ${listFormatter.format(players)} (${players.length})`
					: '👤 Sin jugadores';

				return [`### ${room.id}`, `🕐 <t:${timestamp}:F>`, playerText].join('\n');
			})
			.join('\n');

		return {
			title: 'Salas de Qualifiers',
			description: content,
			footer: { text: `Página ${page + 1} de ${totalPages}` },
		};
	};

	createComponents = (
		ctx: BaseInteractionContext,
		page: number,
		totalPages: number,
	): AnyComponent[] => [
		{
			type: ComponentType.ACTION_ROW,
			components: [
				{
					type: ComponentType.BUTTON,
					style: ButtonStyle.SECONDARY,
					custom_id: this.createCustomId(Action.Previous, ctx.user.id, page),
					label: 'Anterior',
					emoji: { name: '◀️' },
					disabled: page === 0,
				},
				{
					type: ComponentType.BUTTON,
					style: ButtonStyle.SECONDARY,
					custom_id: this.createCustomId(Action.Next, ctx.user.id, page),
					label: 'Siguiente',
					emoji: { name: '▶️' },
					disabled: page === totalPages - 1,
				},
			],
		},
	];

	async run(ctx: CommandContext): Promise<string | MessageOptions> {
		const roomCount = await db.$count(table.qualifierRooms);
		if (roomCount === 0) {
			return 'No hay ninguna sala registrada.';
		}

		const page = 0;
		const totalPages = Math.ceil(roomCount / this.pageSize);
		const listFormatter = new Intl.ListFormat(ctx.locale);

		return {
			embeds: [await this.createEmbed(page, totalPages, listFormatter)],
			components: this.createComponents(ctx, page, totalPages),
		};
	}
}
