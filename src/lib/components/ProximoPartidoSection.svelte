<script lang="ts">
	import type { LastMatch, NextMatch } from '$lib/types';
	import ProximoPartido from './ProximoPartido.svelte';
	import UltimosPartidos from './UltimosPartidos.svelte';

	interface Props {
		nextMatch: NextMatch | undefined;
		lastMatches: LastMatch[];
	}

	let { nextMatch, lastMatches }: Props = $props();
</script>

<div class="flex w-3xl flex-col gap-5">
	<div class="flex h-20 items-center justify-end bg-dark pr-20">
		<span class="text-3xl text-white">próximo partido</span>
	</div>

	<div class="ml-5 flex gap-5">
		<UltimosPartidos {lastMatches} />

		{#if nextMatch}
			<ProximoPartido {nextMatch} />
		{/if}
	</div>
</div>
