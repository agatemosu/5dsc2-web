<script lang="ts">
	import { dates } from '$lib/dates';

	const formatter = new Intl.DateTimeFormat('es-ES', {
		day: 'numeric',
		month: 'short',
	});
</script>

<div class="flex flex-col items-end gap-2.5">
	<span class="text-4xl"> fechas </span>

	<div class="grid w-full max-w-80 grid-cols-2">
		{#each Object.values(dates) as date, i (i)}
			<div>{formatter.format(date.start)} - {formatter.format(date.end)}</div>
			<div class="text-right text-accent">{date.text}</div>
		{/each}
	</div>
</div>
