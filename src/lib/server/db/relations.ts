import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
	players: {
		user: r.one.users({
			from: r.players.userId,
			to: r.users.id,
			optional: false,
		}),
	},
	users: {
		player: r.one.players(),
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
