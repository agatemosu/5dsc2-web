<script lang="ts">
	const partidos = [
		{
			red: { id: 6961543, name: 'Sorangan', score: 5 },
			blue: { id: 18217876, name: 'ESCRUPU', score: 2 },
			date: Temporal.PlainDateTime.from('2026-10-12 19:00'),
		},
		{
			red: { id: 6961543, name: 'Sorangan', score: 3 },
			blue: { id: 18217876, name: 'ESCRUPU', score: 5 },
			date: Temporal.PlainDateTime.from('2026-10-12 18:00'),
		},
		{
			red: { id: 6961543, name: 'Sorangan', score: 5 },
			blue: { id: 18217876, name: 'ESCRUPU', score: 2 },
			date: Temporal.PlainDateTime.from('2026-10-12 17:00'),
		},
		{
			red: { id: 6961543, name: 'Sorangan', score: 5 },
			blue: { id: 18217876, name: 'ESCRUPU', score: 2 },
			date: Temporal.PlainDateTime.from('2026-10-12 16:00'),
		},
		{
			red: { id: 6961543, name: 'Sorangan', score: 1 },
			blue: { id: 18217876, name: 'ESCRUPU', score: 5 },
			date: Temporal.PlainDateTime.from('2026-10-12 15:00'),
		},
		{
			red: { id: 6961543, name: 'Sorangan', score: 5 },
			blue: { id: 18217876, name: 'ESCRUPU', score: 2 },
			date: Temporal.PlainDateTime.from('2026-10-12 14:00'),
		},
	];

	const formatter = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' });
</script>

<div class="relative flex w-82 flex-col items-center bg-dark">
	<span class="my-2.5 text-white">últimos partidos</span>

	<div class="flex flex-col items-center gap-2.5">
		{#each partidos as partido, i (i)}
			<div class="flex w-40">
				<div class="w-12.5 bg-team-red">
					<img
						src="https://a.ppy.sh/{partido.red.id}"
						alt="Avatar de {partido.red.name}"
						class="size-10"
					/>
				</div>

				<div class="flex flex-1 flex-col text-center">
					<div>
						<span class="text-team-red">{partido.red.score}</span>

						<span class="text-white">-</span>

						<span class="text-team-blue">{partido.blue.score}</span>
					</div>

					<div class="text-xs text-white">
						{formatter.format(partido.date)}
					</div>
				</div>

				<div class="flex w-12.5 justify-end bg-team-blue">
					<img
						src="https://a.ppy.sh/{partido.blue.id}"
						alt="Avatar de {partido.blue.name}"
						class="size-10"
					/>
				</div>
			</div>
		{/each}
	</div>

	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-dark/60 to-transparent"
	></div>
</div>
