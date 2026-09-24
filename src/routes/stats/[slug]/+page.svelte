<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Layout from '$lib/components/Layout.svelte';
	import { Mod, StageType } from '$lib/enums';
	import { blur } from 'svelte/transition';
	import type { PageProps } from './$types';
	import MapView from './MapView.svelte';
	import QualifierView from './QualifierView.svelte';
	import SoloView from './SoloView.svelte';

	let { data }: PageProps = $props();

	let { mappools } = $derived(data.round);

	const order = Object.values(Mod);

	let orderedMappool = $derived(
		mappools.toSorted((a, b) => order.indexOf(a.slotName) - order.indexOf(b.slotName)),
	);

	type View = 'qualifier-results' | 'solo-results' | 'mappool-summary' | 'map-leaderboard';

	const viewLabels: Record<View, string> = {
		'qualifier-results': 'resultados de qualifiers',
		'solo-results': 'resultados individuales',
		'mappool-summary': 'resumen de mappool',
		'map-leaderboard': 'leaderbord de mapas',
	};

	let view: View = $derived(
		data.round.stageType === StageType.Qualifiers ? 'qualifier-results' : 'solo-results',
	);

	let views = $derived([
		...(data.round.stageType === StageType.Qualifiers ? ['qualifier-results'] : []),
		'solo-results',
		// 'mappool-summary',
		'map-leaderboard',
	] as View[]);
</script>

<Layout>
	<div class="flex min-w-0 scrollbar-thin gap-2.5 overflow-x-auto">
		{#each data.rounds as round (round.slug)}
			{#if round.hasScores}
				<a
					href={resolve('/stats/[slug]', { slug: round.slug })}
					class="shrink-0 px-5 py-3 text-sm text-white {page.params.slug === round.slug
						? 'bg-accent'
						: 'bg-gray'}"
				>
					{round.name}
				</a>
			{:else}
				<div class="shrink-0 cursor-not-allowed bg-dark px-5 py-3 text-sm text-white">
					{round.name}
				</div>
			{/if}
		{/each}
	</div>

	<div class="py-5 text-4xl text-white">{data.round.name}</div>

	{#key page.params.slug}
		<div
			out:blur={{ duration: 200 }}
			in:blur={{ delay: 200, duration: 200 }}
			class="flex flex-col gap-2.5"
		>
			<div class="flex items-center gap-4 text-white">
				vista:

				<select
					bind:value={view}
					class="cursor-pointer bg-gray p-2 text-white hover:brightness-125"
				>
					{#each views as view (view)}
						<option value={view}>{viewLabels[view]}</option>
					{/each}
				</select>
			</div>

			<div class="w-full overflow-x-auto">
				<div class="flex w-fit min-w-full justify-center">
					{#if view === 'qualifier-results'}
						<QualifierView scores={data.round.scores} maps={orderedMappool} />
					{:else if view === 'solo-results'}
						<SoloView scores={data.round.scores} />
					{:else if view === 'map-leaderboard'}
						<MapView
							scores={data.round.scores}
							maps={orderedMappool}
							playerId={data.user?.player?.id}
						/>
					{/if}
				</div>
			</div>
		</div>
	{/key}
</Layout>
