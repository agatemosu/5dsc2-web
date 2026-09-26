<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';
	import { MAX_QUALIFIED_SEED } from '$lib/consts';
	import type { PageProps } from './$types';
	import PlayerGrid from './PlayerGrid.svelte';

	let { data }: PageProps = $props();
</script>

{#snippet playerCount()}
	<div class="self-end bg-dark px-10 py-5 text-xl text-white">{data.players.length}</div>
{/snippet}

<Layout title="jugadores" extra={playerCount}>
	<div class="flex flex-col">
		{#if !data.allHaveSeed}
			<PlayerGrid players={data.players} />
		{:else}
			<h2 class="-mt-2.5 mb-2.5 bg-dark py-2 text-center text-xl text-white">clasificados</h2>

			<PlayerGrid players={data.players.slice(0, MAX_QUALIFIED_SEED)} />

			<h2 class="mt-2.5 mb-2.5 bg-dark py-2 text-center text-xl text-white">no clasificados</h2>

			<PlayerGrid players={data.players.slice(MAX_QUALIFIED_SEED)} />
		{/if}
	</div>
</Layout>
