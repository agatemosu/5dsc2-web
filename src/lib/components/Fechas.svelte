<script lang="ts">
	import { dates } from '$lib/dates';
	import InstantTooltip from './InstantTooltip.svelte';

	const formatter = new Intl.DateTimeFormat('es-ES', {
		day: 'numeric',
		month: 'short',
	});
</script>

<div class="flex flex-col items-end gap-2.5">
	<span class="text-4xl"> fechas </span>

	<div class="grid w-full max-w-80 grid-cols-2">
		{#each Object.values(dates) as date, i (i)}
			<div>
				<InstantTooltip instant={date.start.toInstant()}>
					{formatter.format(date.start.epochMilliseconds)}
				</InstantTooltip>
				-
				<InstantTooltip instant={date.end.toInstant()}>
					{formatter.format(date.end.epochMilliseconds)}
				</InstantTooltip>
			</div>
			<div class="text-right text-accent">{date.text}</div>
		{/each}
	</div>
</div>
