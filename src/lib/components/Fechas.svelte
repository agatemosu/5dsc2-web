<script lang="ts">
	const dates = [
		{
			start: Temporal.PlainDateTime.from('2026-08-23'),
			end: Temporal.PlainDateTime.from('2026-09-07'),
			text: 'registros',
		},
		{
			start: Temporal.PlainDateTime.from('2026-09-11'),
			end: Temporal.PlainDateTime.from('2026-09-20'),
			text: 'qualifiers',
		},
		{
			start: Temporal.PlainDateTime.from('2026-09-19'),
			end: Temporal.PlainDateTime.from('2026-09-20'),
			text: 'liga fase 1',
		},
		{
			start: Temporal.PlainDateTime.from('2026-09-26'),
			end: Temporal.PlainDateTime.from('2026-09-27'),
			text: 'liga fase 2',
		},
		{
			start: Temporal.PlainDateTime.from('2026-10-03'),
			end: Temporal.PlainDateTime.from('2026-10-04'),
			text: 'la purga',
		},
		{
			start: Temporal.PlainDateTime.from('2026-10-10'),
			end: Temporal.PlainDateTime.from('2026-10-11'),
			text: 'ro 16',
		},
		{
			start: Temporal.PlainDateTime.from('2026-10-17'),
			end: Temporal.PlainDateTime.from('2026-10-18'),
			text: 'quarterfinals',
		},
		{
			start: Temporal.PlainDateTime.from('2026-10-24'),
			end: Temporal.PlainDateTime.from('2026-10-25'),
			text: 'semifinals',
		},
		{
			start: Temporal.PlainDateTime.from('2026-10-31'),
			end: Temporal.PlainDateTime.from('2026-11-01'),
			text: 'finals',
		},
		{
			start: Temporal.PlainDateTime.from('2026-11-07'),
			end: Temporal.PlainDateTime.from('2026-11-08'),
			text: 'grandfinals',
		},
	];

	const formatter = new Intl.DateTimeFormat('es-ES', {
		day: 'numeric',
		month: 'short',
	});
</script>

<div class="flex w-3xl flex-col items-end gap-2.5">
	<span class="text-4xl"> fechas </span>

	<div class="w-77.5">
		{#each dates as date}
			<div class="flex justify-between">
				<div>{formatter.format(date.start)} - {formatter.format(date.end)}</div>
				<div class="text-accent">{date.text}</div>
			</div>
		{/each}
	</div>
</div>
