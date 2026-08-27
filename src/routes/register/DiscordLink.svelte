<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import DiscordIcon from '$lib/assets/discord.svg?component';
	import LinkIcon from '$lib/assets/link.svg?component';
	import UnlinkIcon from '$lib/assets/unlink.svg?component';
	import type { DiscordUser } from '$lib/server/db/schema';

	interface Props {
		discord: DiscordUser | null;
		registered: boolean;
	}

	let { discord, registered }: Props = $props();

	let discordData = $derived.by(() => {
		if (!discord) {
			return null;
		}

		const avatar = discord.avatar
			? `https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png`
			: `https://cdn.discordapp.com/embed/avatars/${(BigInt(discord.id) >> 22n) % 6n}.png`;

		const username = discord.globalName
			? `${discord.globalName} (@${discord.username})`
			: discord.username;

		return { avatar, username };
	});
</script>

<div class="mt-2 flex w-full max-w-2xl justify-between place-self-center bg-accent px-4 py-2">
	<div class="flex items-center gap-3">
		{#if discord}
			<img
				src={discordData!.avatar}
				alt={`Avatar de ${discord.username}`}
				class="size-10 rounded-full"
			/>
			<span class="text-xl text-white">{discordData!.username}</span>
		{:else}
			<DiscordIcon class="size-10 text-white" />
			<span class="text-xl text-white">Discord (sin vincular)</span>
		{/if}
	</div>
	{#if registered}
		<a
			href={resolve('/auth/discord')}
			class="mr-2 flex items-center gap-1 text-white hover:underline"
		>
			<i class="icon-[lucide--link] size-5"></i> Vincular otro Discord
		</a>
	{:else if discord}
		<form method="post" action="?/unlink" use:enhance class="flex items-center">
			<button
				type="submit"
				class="mr-2 flex cursor-pointer items-center gap-1 text-white hover:underline"
			>
				<UnlinkIcon class="size-5" /> Desvincular
			</button>
		</form>
	{:else}
		<a
			href={resolve('/auth/discord')}
			class="mr-2 flex items-center gap-1 text-white hover:underline"
		>
			<LinkIcon class="size-5" /> Vincular
		</a>
	{/if}
</div>
