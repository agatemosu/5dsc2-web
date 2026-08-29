import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
	players: {
		osu: r.one.osuUsers({
			from: r.players.userId.through(r.users.id),
			to: r.osuUsers.id.through(r.users.osuId),
			optional: false,
		}),
	},
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
	sessions: {
		user: r.one.users({
			from: r.sessions.userId,
			to: r.users.id,
			optional: false,
		}),
	},
}));
