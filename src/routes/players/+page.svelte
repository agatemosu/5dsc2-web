<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';
	import type { PageProps } from './$types';
	import PlayerGrid from './PlayerGrid.svelte';

	let { data }: PageProps = $props();
</script>

<Layout title="jugadores">
	<div class="flex flex-col">
		{#if !data.allHaveSeed}
			<PlayerGrid players={data.players} />
		{:else}
			<h2
				class="sticky top-(--header-height) z-20 -mt-2.5 mb-2.5 bg-dark py-2 text-center text-xl text-white"
			>
				clasificados
			</h2>

			<PlayerGrid players={data.players.slice(0, 32)} />

			<h2
				class="sticky top-(--header-height) z-20 mt-2.5 mb-2.5 bg-dark py-2 text-center text-xl text-white"
			>
				no clasificados
			</h2>

			<PlayerGrid players={data.players.slice(32)} />
		{/if}
	</div>
</Layout>
