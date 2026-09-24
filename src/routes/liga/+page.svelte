<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';

	const lb = [
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
		{ player: 'Yuri Enjoyer', g: 7, e: 0, p: 2, diff: 5, puntos: 17 },
	] as const;
</script>

<Layout title="liga">
	<div class="absolute top-0 left-0 flex w-20 flex-col">
		<div class="flex h-135 items-center justify-center bg-accent">
			<div class="-rotate-90 text-2xl whitespace-nowrap text-white">Round of 16</div>
		</div>

		<div class="flex h-230 items-center justify-center bg-accent-dark">
			<div class="-rotate-90 text-2xl whitespace-nowrap text-white">La purga</div>
		</div>

		<div class="flex h-180 items-center justify-center bg-gray">
			<div class="-rotate-90 text-2xl whitespace-nowrap text-white">Eliminados</div>
		</div>
	</div>
	<div class="ml-20 h-535 text-white">
		<table class="min-w-max border-separate border-spacing-y-2">
			<thead>
				<tr>
					<th class="px-4 py-3 text-left font-normal text-white underline">posición</th>
					<th class="w-full px-4 py-3 text-left font-normal text-white underline">jugador</th>
					<th class="px-4 py-3 text-center font-normal text-green-300 underline">g</th>
					<th class="px-4 py-3 text-center font-normal text-neutral-400 underline">e</th>
					<th class="py-2 pr-10 pl-4 text-center font-normal text-rose-400 underline">p</th>
					<th class="px-4 py-3 text-right font-normal text-white underline">diff</th>
					<th class="px-4 py-3 text-right font-normal text-white underline">puntos</th>
				</tr>
			</thead>
			<tbody>
				{#each lb as item, i (i)}
					{#if i === 8 || i === 24}
						<tr>
							<td colspan="7" class="py-2">
								<div class="h-px w-full bg-accent"></div>
							</td>
						</tr>
					{/if}

					<tr class:bg-gray={i % 2 === 0}>
						<td class="px-4 py-3 text-left">{i + 1}</td>
						<td class="px-4 py-3 text-left">{item.player}</td>
						<td class="px-4 py-3 text-center text-green-300">{item.g}</td>
						<td class="px-4 py-3 text-center text-neutral-400">{item.e}</td>
						<td class="py-2 pr-10 pl-4 text-center text-rose-400">{item.p}</td>
						<td class="px-4 py-3 text-right">{item.diff}</td>
						<td class="px-4 py-3 text-right">{item.puntos}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Layout>
