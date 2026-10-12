import { endpoint } from '#lib/server/discord-bot/slash.ts';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	return await endpoint(event.request);
};
