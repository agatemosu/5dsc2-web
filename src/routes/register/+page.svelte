<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import OsuLogo from '$lib/assets/osu.svg?component';
	import type { EncodedAvailability } from '$lib/availability';
	import Layout from '$lib/components/Layout.svelte';
	import AvailabilityForm from './AvailabilityForm.svelte';
	import DiscordLink from './DiscordLink.svelte';

	let { data, form } = $props();
	let userError = page.url.searchParams.get('error');
</script>

<Layout title="Registro">
	{#if data.user == null || data.playerData == null}
		<a
			href={resolve('/auth/osu')}
			class="flex items-center gap-3 place-self-center bg-[#F24998] px-4 py-2 text-white hover:opacity-80"
		>
			<OsuLogo class="size-10" />
			<span class="text-xl">Inicia sesión con osu!</span>
		</a>
	{:else}
		<DiscordLink
			discord={data.playerData.discord}
			registered={data.user.player !== null}
		/>

		<div class="my-6 flex flex-col text-center">
			<p class="text-white">
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
