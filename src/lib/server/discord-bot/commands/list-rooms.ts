import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import {
	ButtonStyle,
	CommandContext,
	ComponentType,
	SlashCommand,
	SlashCreator,
	type AnyComponent,
	type MessageEmbedOptions,
} from 'slash-create';

export class ListRoomsCommand extends SlashCommand {
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
	}

	static readonly pageSize = 5;

	static getRooms = (page: number) => {
		return db.query.qualifierRooms.findMany({
			orderBy: {
				startTime: 'asc',
			},
			limit: ListRoomsCommand.pageSize,
			offset: page * ListRoomsCommand.pageSize,
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

	static createEmbed = async (
		page: number,
		totalPages: number,
		listFormatter: Intl.ListFormat,
	): Promise<MessageEmbedOptions> => {
		const rooms = await this.getRooms(page);

		const content = rooms
			.map((room) => {
				const timestamp = Math.floor(room.startTime.getTime() / 1000);
				const players = room.players.map((p) => p.osu.username);

				const playerText = players.length
					? `👤 ${listFormatter.format(players)} (${players.length})`
					: '👤 Sin jugadores';

				return [`### ${room.id}`, `🕐 <t:${timestamp}:F>`, playerText].join('\n');
			})
			.join('\n');

		return {
			title: 'Salas de clasificación',
			description: content,
			footer: { text: `Página ${page + 1} de ${totalPages}` },
		};
	};

	static createComponents = (page: number, totalPages: number): AnyComponent[] => [
		{
			type: ComponentType.ACTION_ROW,
			components: [
				{
					type: ComponentType.BUTTON,
					style: ButtonStyle.SECONDARY,
					custom_id: 'rooms_previous',
					label: 'Anterior',
					emoji: { name: '◀️' },
					disabled: page === 0,
				},
				{
					type: ComponentType.BUTTON,
					style: ButtonStyle.SECONDARY,
					custom_id: 'rooms_next',
					label: 'Siguiente',
					emoji: { name: '▶️' },
					disabled: page === totalPages - 1,
				},
			],
		},
	];

	async run(ctx: CommandContext) {
		await ctx.defer();

		const roomCount = await db.$count(table.qualifierRooms);

		if (roomCount === 0) {
			await ctx.send('No hay ninguna sala registrada.');
			return;
		}

		let page = 0;
		const totalPages = Math.ceil(roomCount / ListRoomsCommand.pageSize);
		const listFormatter = new Intl.ListFormat(ctx.locale);

		await ctx.send({
			embeds: [await ListRoomsCommand.createEmbed(page, totalPages, listFormatter)],
			components: ListRoomsCommand.createComponents(page, totalPages),
		});

		ctx.registerComponent('rooms_previous', async (btnCtx) => {
			if (page <= 0) return;

			page--;

			await btnCtx.editParent({
				embeds: [await ListRoomsCommand.createEmbed(page, totalPages, listFormatter)],
				components: ListRoomsCommand.createComponents(page, totalPages),
			});
		});

		ctx.registerComponent('rooms_next', async (btnCtx) => {
			if (page >= totalPages - 1) return;

			page++;

			await btnCtx.editParent({
				embeds: [await ListRoomsCommand.createEmbed(page, totalPages, listFormatter)],
				components: ListRoomsCommand.createComponents(page, totalPages),
			});
		});
	}
}
