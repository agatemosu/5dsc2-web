<script lang="ts">
	import { calcMatchCosts } from '$lib/stats/solo-stats';
	import { gradeClass, pickClass, tw } from '$lib/tailwind';
	import type { ScoreWithPlayer } from '$lib/types';

	interface Props {
		scores: ScoreWithPlayer[];
	}

	let { scores }: Props = $props();

	const matchCostFormatter = new Intl.NumberFormat('es-ES', {
		maximumFractionDigits: 3,
	});

	const scoreFormatter = new Intl.NumberFormat('es-ES', {
		maximumFractionDigits: 0,
	});

	const accuracyFormatter = new Intl.NumberFormat('es-ES', {
		style: 'percent',
		maximumFractionDigits: 2,
	});

	function getPositionClass(userIndex: number) {
		if (userIndex === 0) return tw('text-qualifier-gold');
		if (userIndex === 1) return tw('text-qualifier-silver');
		if (userIndex === 2) return tw('text-qualifier-bronze');

		return tw('text-background');
	}

	let matchCosts = $derived(calcMatchCosts(scores));
</script>

<table class="min-w-max">
	<thead>
		<tr>
			<th class="px-2 py-2 text-center font-normal text-white underline">#</th>
			<th class="px-4 py-2 text-left font-normal text-white underline">player</th>
			<th class="px-4 py-2 text-center font-normal text-white underline">match cost</th>
			<th class="px-4 py-2 text-center font-normal text-white underline">avg. score</th>
			<th class="px-4 py-2 text-center font-normal text-white underline">avg. acc</th>
			<th class="px-4 py-2 text-center font-normal text-white underline"># de mapas</th>
			<th class="px-4 py-2 text-center font-normal text-white underline">mejor score</th>
		</tr>
	</thead>
	<tbody>
		{#each matchCosts as player, i (player.player.id)}
			<tr class="bg-dark odd:bg-[#353535]">
				<td class="px-2 py-2 text-center {getPositionClass(i)}">#{i + 1}</td>
				<td class="px-4 py-2 text-left text-background">
					{player.player.osu.username}
				</td>
				<td class="px-4 py-2 text-center text-background">
					{matchCostFormatter.format(player.matchCost)}
				</td>
				<td class="px-4 py-2 text-center text-background">
					{scoreFormatter.format(player.avgScore)}
				</td>
				<td class="px-4 py-2 text-center text-background">
					{accuracyFormatter.format(player.avgAcc)}
				</td>
				<td class="px-4 py-2 text-center text-background">
					{player.mapNum}
				</td>
				<td class="px-4 py-2">
					<div class="flex w-48 items-center justify-between">
						<div class="flex flex-col">
							<div class="flex items-baseline gap-2">
								<span class="text-background tabular-nums">
									{scoreFormatter.format(player.higestScore.score)}
								</span>

								<span class="text-xs {pickClass(player.higestScore.pick).text}">
									{accuracyFormatter.format(player.higestScore.accuracy)}
								</span>
							</div>

							<div class="truncate text-xs {pickClass(player.higestScore.pick).text}">
								{player.higestScore.pick}
							</div>
						</div>

						<div
							class="flex size-10 items-center justify-center text-2xl drop-shadow-[0_0_5px]/80 drop-shadow-inherit {gradeClass[
								player.higestScore.grade
							].text}"
						>
							{player.higestScore.grade.replace(/H$/, '')}
						</div>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
