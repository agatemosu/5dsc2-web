<script lang="ts">
	import { groupMapScores } from '$lib/stats/leaderboard-stats';
	import { gradeClass } from '$lib/tailwind';
	import type { FullMappool, ScoreWithPlayer } from '$lib/types';
	import StatsBeatmapCard from './StatsBeatmapCard.svelte';

	interface Props {
		scores: ScoreWithPlayer[];
		maps: FullMappool[];
		playerId: number | undefined;
	}

	let { maps, scores, playerId }: Props = $props();

	const scoreFormatter = new Intl.NumberFormat('es-ES', {
		maximumFractionDigits: 0,
	});

	const accuracyFormatter = new Intl.NumberFormat('es-ES', {
		style: 'percent',
		maximumFractionDigits: 2,
	});

	let mapsWithScores = $derived(groupMapScores(scores, maps));
</script>

<div class="flex flex-col gap-4 overflow-auto">
	{#each mapsWithScores as map (map.map.id)}
		<div class="grid h-80 w-5xl grid-cols-2 overflow-clip bg-[#212121]">
			<StatsBeatmapCard map={map.map} />
			<div class="flex flex-col overflow-y-scroll">
				{#each map.scores as scoreData, i (i)}
					<div
						class={[
							'flex items-center gap-2 px-4 py-2',
							playerId && scoreData.playerId === playerId
								? 'border-yellow-400/50 bg-yellow-400/25'
								: 'border-transparent odd:bg-gray',
						]}
					>
						<span class="w-10 text-center text-white">#{i + 1}</span>
						<div class="flex-1 text-white">
							{scoreData.player.osu.username}
						</div>
						<div class="w-24 text-white">
							{scoreFormatter.format(scoreData.score)}
						</div>
						<div class="w-20 text-white">
							{accuracyFormatter.format(scoreData.accuracy)}
						</div>
						<div
							class="w-8 text-center text-xl drop-shadow-[0_0_5px]/80 drop-shadow-inherit {gradeClass[
								scoreData.grade
							].text}"
						>
							{scoreData.grade.replace(/H$/, '')}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
