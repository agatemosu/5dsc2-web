import { endpoint } from '$lib/server/discord-bot/slash';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	return await endpoint(event.request);
};
