<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';

	let { data } = $props();

	let sortedLeaderboard = $derived(
		data.leagueLeaderboard.toSorted(
			(a, b) => b.points - a.points || b.difference - a.difference || (a.user.player?.seed ?? -1) - (b.user.player?.seed ?? -1)
		),
	);
</script>

<Layout title="liga">
	<div class="absolute top-0 left-0 flex w-15 flex-col md:w-20">
		<div class="flex h-112 items-center justify-center bg-accent">
			<div class="-rotate-90 text-2xl whitespace-nowrap text-white">Round of 16</div>
		</div>

		<div class="flex h-196 items-center justify-center bg-accent-dark">
			<div class="-rotate-90 text-2xl whitespace-nowrap text-white">La purga</div>
		</div>

		<div class="flex h-156 items-center justify-center bg-gray">
			<div class="-rotate-90 text-2xl whitespace-nowrap text-white">Eliminados</div>
		</div>
	</div>
	<div class="ml-15 h-454 overflow-auto text-white md:ml-20">
		<table class="min-w-full">
			<thead>
				<tr>
					<th class="w-24 px-4 pb-3 text-left font-normal text-white underline">posición</th>
					<th class="w-full min-w-52 px-4 pb-3 text-left font-normal text-white underline"
						>jugador</th
					>
					<th class="w-16 px-4 pb-3 text-center font-normal text-green-300 underline">g</th>
					<th class="w-16 px-4 pb-3 text-center font-normal text-neutral-400 underline">e</th>
					<th class="w-16 pr-10 pb-3 pl-4 text-center font-normal text-rose-400 underline">p</th>
					<th class="w-20 px-4 pb-3 text-right font-normal text-white underline">diff</th>
					<th class="w-24 px-4 pb-3 text-right font-normal text-white underline">puntos</th>
				</tr>
			</thead>
			<tbody>
				{#each sortedLeaderboard as item, i (i)}
					{#if i === 8 || i === 24}
						<tr>
							<td colspan="7" class="py-2">
								<div class="h-px w-full bg-accent"></div>
							</td>
						</tr>
					{/if}

					<tr class={i % 2 === 0 ? 'bg-gray' : null}>
						<td class="px-4 py-3 text-left">{i + 1}</td>
						<td class="flex items-center gap-2.5 px-4 py-1 text-left">
							<img
								src="https://a.ppy.sh/{item.user.osu.id}"
								alt="Avatar de {item.user.osu.username}"
								class="size-10"
							/>
							{item.user.osu.username}
						</td>
						<td class="px-4 py-3 text-center text-green-300">{item.wins}</td>
						<td class="px-4 py-3 text-center text-neutral-400">{item.draws}</td>
						<td class="py-3 pr-10 pl-4 text-center text-rose-400">{item.losses}</td>
						<td class="px-4 py-3 text-right">{item.difference}</td>
						<td class="px-4 py-3 text-right">{item.points}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Layout>
