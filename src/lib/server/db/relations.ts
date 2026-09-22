import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
	users: {
		player: r.one.players({
			from: r.users.id,
			to: r.players.userId,
		}),
		osu: r.one.osuUsers({
			from: r.users.osuId,
			to: r.osuUsers.id,
			optional: false,
		}),
		discord: r.one.discordUsers({
			from: r.users.discordId,
			to: r.discordUsers.id,
		}),
	},
	players: {
		user: r.one.users({
			from: r.players.userId,
			to: r.users.id,
			optional: false,
		}),
		osu: r.one.osuUsers({
			from: r.players.userId.through(r.users.id),
			to: r.osuUsers.id.through(r.users.osuId),
			optional: false,
		}),
		discord: r.one.discordUsers({
			from: r.players.userId.through(r.users.id),
			to: r.discordUsers.id.through(r.users.discordId),
			optional: false,
		}),
	},
	qualifierRooms: {
		players: r.many.players({
			from: r.qualifierRooms.id,
			to: r.players.qualifierRoomId,
		}),
	},
	rounds: {
		mappools: r.many.mappools({
			from: r.rounds.id,
			to: r.mappools.roundId,
		}),
		matches: r.many.matches({
			from: r.rounds.id,
			to: r.matches.roundId,
		}),
	},
	matches: {
		red: r.one.players({
			from: r.matches.teamRedId,
			to: r.players.id,
		}),
		blue: r.one.players({
			from: r.matches.teamBlueId,
			to: r.players.id,
		}),
	},
	mappools: {
		beatmap: r.one.beatmaps({
			from: r.mappools.beatmapId,
			to: r.beatmaps.id,
			optional: false,
		}),
	},
	beatmaps: {
		beatmapset: r.one.beatmapsets({
			from: r.beatmaps.beatmapsetId,
			to: r.beatmapsets.id,
			optional: false,
		}),
	},
	sessions: {
		user: r.one.users({
			from: r.sessions.userId,
			to: r.users.id,
			optional: false,
		}),
	},
}));
