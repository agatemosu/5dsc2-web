<script lang="ts">
	import type { Score } from '$lib/server/db/schema';
	import { calcZsums } from '$lib/stats/qualifier-stats';
	import { modClass, tw } from '$lib/tailwind';
	import type { FullMappool, ScoreWithPlayer } from '$lib/types';

	interface Props {
		scores: ScoreWithPlayer[];
		maps: FullMappool[];
	}

	let { scores, maps }: Props = $props();

	const zsumFormatter = new Intl.NumberFormat('es-ES', {
		maximumFractionDigits: 2,
	});

	const scoreFormatter = new Intl.NumberFormat('es-ES', {
		maximumFractionDigits: 0,
	});

	function getPositionClass(userIndex: number) {
		if (userIndex === 0) return tw('text-qualifier-gold');
		if (userIndex === 1) return tw('text-qualifier-silver');
		if (userIndex === 2) return tw('text-qualifier-bronze');

		return tw('text-background');
	}

	function getScoreClass(scoreIndex: number) {
		if (scoreIndex === 0) return tw('bg-qualifier-gold/20 text-qualifier-gold');
		if (scoreIndex === 1) return tw('bg-qualifier-silver/40 text-qualifier-silver');
		if (scoreIndex === 2) return tw('bg-qualifier-bronze/20 text-qualifier-bronze');
		if (scoreIndex < 8) return tw('bg-gray/50 text-background/50');
		if (scoreIndex < 16) return tw('bg-dark text-background/50');

		return tw('bg-dark text-background/25');
	}

	let zsums = $derived(calcZsums(scores));

	let scoresByPick = $derived(
		Map.groupBy(
			scores.toSorted((a, b) => b.score - a.score),
			(item) => item.pick,
		),
	);
</script>

<table class="min-w-max">
	<thead>
		<tr>
			<th class="px-2 py-2 text-center font-normal text-white underline">#</th>
			<th class="px-4 py-2 text-left font-normal text-white underline">player</th>
			<th class="px-4 py-2 text-center font-normal text-white underline">z-sum</th>
			<th class="px-4 py-2 text-center font-normal text-white underline">avg. score</th>
			{#each maps as map (map.id)}
				<th class="px-4 py-2 text-center font-normal underline {modClass[map.slotName].text}">
					{map.slotName}{map.slotIndex}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each zsums as zsum, i (zsum.player.id)}
			<tr class="bg-dark">
				<td class="px-2 py-2 text-center {getPositionClass(i)}">#{i + 1}</td>
				<td class="px-4 py-2 text-left text-background">
					{zsum.player.osu.username}
				</td>
				<td class="px-4 py-2 text-center text-background">
					{zsumFormatter.format(zsum.zSum)}
				</td>
				<td class="px-4 py-2 text-center text-background">
					{scoreFormatter.format(zsum.avgScore)}
				</td>
				{#each zsum.scores as score (score.id)}
					{@const scoreIndex = (scoresByPick.get(score.pick) as Score[]).findIndex(
						(s) => s.id === score.id,
					)}
					<td class="px-4 py-2 text-center {getScoreClass(scoreIndex)}">
						#{scoreIndex + 1} - {scoreFormatter.format(score.normalizedScore)}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
