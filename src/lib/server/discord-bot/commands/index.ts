import type { SlashCommand } from 'slash-create';
import { AddRoomBulkCommand } from './add-room-bulk.ts';
import { AddRoomCommand } from './add-room.ts';
import { DeleteRoomCommand } from './delete-room.ts';
import { ListRoomsCommand } from './list-rooms.ts';
import { RefreshPlayersCommand } from './refresh-players.ts';
import { RemovePlayerRoleCommand } from './remove-player-role.ts';

export const commands: (typeof SlashCommand)[] = [
	AddRoomBulkCommand,
	AddRoomCommand,
	DeleteRoomCommand,
	ListRoomsCommand,
	RefreshPlayersCommand,
	RemovePlayerRoleCommand,
];
