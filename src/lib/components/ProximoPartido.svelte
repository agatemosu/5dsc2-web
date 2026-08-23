<script lang="ts">
	import ProximoPartidoPlayer from './ProximoPartidoPlayer.svelte';

	const partido = {
		red: { id: 6961543, name: 'Sorangan', seed: 32 },
		blue: { id: 18217876, name: 'ESCRUPU', seed: 1 },
		date: Temporal.PlainDateTime.from('2026-10-12 20:00'),
	};

	const remainingTime = Temporal.Now.plainDateTimeISO().until(partido.date).round({
		smallestUnit: 'minute',
	});
</script>

<div class="flex flex-col items-end gap-5">
	<div class="flex w-104 bg-dark">
		<ProximoPartidoPlayer user={partido.red} />

		<div class="flex flex-1 items-center justify-center bg-accent text-2xl text-white">vs</div>

		<ProximoPartidoPlayer user={partido.blue} />
	</div>

	<div class="flex h-12.5 w-40 flex-col justify-center bg-dark text-center text-xs text-white">
		<span>empieza en</span>
		<span>{remainingTime.toLocaleString('es-ES')}</span>
	</div>
</div>
