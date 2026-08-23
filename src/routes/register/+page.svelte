<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { EncodedAvailability } from '$lib/availability';
	import Layout from '$lib/components/Layout.svelte';
	import OsuLogo from '$lib/assets/osu.svg?component';
	import DiscordLink from '$lib/components/DiscordLink.svelte';
	import AvailabilityForm from '$lib/components/AvailabilityForm.svelte';

	let { data, form } = $props();
	let userError = page.url.searchParams.get('error');
</script>

<Layout title="Registro">
	{#if data.user == null || data.playerData == null}
		<a
			href={resolve('/auth/osu')}
			class="flex items-center gap-3 place-self-center bg-[#F24998] px-4 py-2 hover:opacity-80"
		>
			<OsuLogo class="size-10 text-white" />
			<span class="text-xl">Inicia sesión con osu!</span>
		</a>
	{:else}
		<DiscordLink
			discord={data.playerData.discord}
			registered={data.user.player?.registeredAt !== undefined}
		/>

		<div class="my-6 flex flex-col text-center">
			<p>
				Marca las horas en las que crees poder estar disponible para jugar partidos. Se usará <b
					>horario peninsular</b
				> en todo momento.
			</p>
			{#if userError}
				<p class="text-red-500">ERROR: {userError}</p>
			{/if}
		</div>

		<AvailabilityForm
			serverAvailability={data.user.player?.availability as EncodedAvailability | undefined}
			loggedInDiscord={data.playerData.discord !== null}
		/>

		{#if form?.error}
			<p class="text-center text-lg text-red-500">{form.error}</p>
		{/if}
		{#if form?.success}
			<p class="text-center text-lg text-green-500">Registro exitoso.</p>
		{/if}
	{/if}
</Layout>
