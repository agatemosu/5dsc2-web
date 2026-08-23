import { env } from '$env/dynamic/private';
import { UserError } from '$lib/user-error';

export async function joinUserToServer(userId: string, accessToken: string) {
	const url = `https://discord.com/api/v10/guilds/${env.DISCORD_GUILD_ID}/members/${userId}`;

	const response = await fetch(url, {
		body: JSON.stringify({
			access_token: accessToken,
		}),
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
		},
	});

	if (response.ok) {
		return null;
	}

	const cause = await response.text();

	console.error('Could not add user to server:', cause);
	return new UserError(
		'Ha ocurrido un error al intentar meterte al servidor de Discord. Deberás entrar manualmente.',
	);
}

export async function addRoleToUser(userId: string) {
	const url = `https://discord.com/api/v10/guilds/${
		env.DISCORD_GUILD_ID
	}/members/${userId}/roles/${env.DISCORD_ROLE_ID}`;

	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
		},
	});

	if (response.ok) {
		return null;
	}

	const cause = await response.text();

	console.error('Could not add role to user:', cause);
	return new UserError('No se te pudo agregar el rol de jugador.');
}
