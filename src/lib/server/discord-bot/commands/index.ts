import type { SlashCommand } from 'slash-create';
import { AddRoomCommand } from './add-room.ts';
import { ListRoomsCommand } from './list-rooms.ts';

export const commands: (typeof SlashCommand)[] = [AddRoomCommand, ListRoomsCommand];
