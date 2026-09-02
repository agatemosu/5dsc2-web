import { env } from '$env/dynamic/private';
import { GenericServer, SlashCreator } from 'slash-create';
import { commands } from './commands';

export const creator = new SlashCreator({
	applicationID: env.DISCORD_APP_ID,
	publicKey: env.DISCORD_PUBLIC_KEY,
	token: env.DISCORD_BOT_TOKEN,
});

const server = new GenericServer();
creator.withServer(server);

creator.registerCommands(commands);

await creator.syncCommands({ skipGuildErrors: false });

export const endpoint = server.endpoint;
