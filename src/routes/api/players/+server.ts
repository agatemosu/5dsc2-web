import { MAX_QUALIFIED_SEED } from '#lib/consts.ts';
import { db } from '#lib/server/db/index.ts';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const players = await db.query.players.findMany({
		where: {
			seed: { lte: MAX_QUALIFIED_SEED },
		},
		columns: { userId: true, seed: true },
		with: {
			osu: {
				columns: { id: true, username: true, coverUrl: true },
			},
		},
	});

	return Response.json(players);
};
