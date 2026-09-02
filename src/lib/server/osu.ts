import { env } from '$env/dynamic/private';
import * as osu from 'osu-api-v2-js';

export const osuApi = new osu.API({
	client_id: Number(env.OSU_CLIENT_ID),
	client_secret: env.OSU_CLIENT_SECRET,
});
