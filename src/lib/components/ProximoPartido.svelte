<script lang="ts">
	import type { NextMatch } from '$lib/types';
	import ProximoPartidoPlayer from './ProximoPartidoPlayer.svelte';

	interface Props {
		nextMatch: NextMatch;
	}

	let { nextMatch }: Props = $props();

	const remainingTime = $derived(
		Temporal.Now.instant().until(nextMatch.startTime).round({
			largestUnit: 'days',
			smallestUnit: 'minute',
		}),
	);
</script>

<div class="flex flex-col items-end gap-5">
	<div class="flex w-104 bg-dark">
		<ProximoPartidoPlayer user={nextMatch.red} />

		<div class="flex flex-1 items-center justify-center bg-accent text-2xl text-white">vs</div>

		<ProximoPartidoPlayer user={nextMatch.blue} />
	</div>

	<div class="flex h-12.5 w-40 flex-col justify-center bg-dark text-center text-xs text-white">
		<span>empieza en</span>
		<span>{remainingTime.toLocaleString('es-ES')}</span>
	</div>
</div>
