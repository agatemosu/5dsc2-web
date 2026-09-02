<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import BeatmapCard from '$lib/components/BeatmapCard.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import { blur } from 'svelte/transition';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let { mappools, mappackUrl } = $derived(data.round);
</script>

<Layout title="mappool">
	<div class="flex min-w-0 gap-2.5 overflow-x-auto">
		{#each data.rounds as round (round.slug)}
			<a
				href={resolve('/mappool/[slug]', { slug: round.slug })}
				class="shrink-0 px-5 py-3 text-sm text-white {page.params.slug === round.slug
					? 'bg-accent'
					: round.mappoolPublishedAt !== null
						? 'bg-gray'
						: 'bg-dark'}"
			>
				{round.name}
			</a>
		{/each}
	</div>

	<div class="flex gap-2.5 py-5">
		<a
			href={mappackUrl}
			aria-label="Descargar"
			class="flex size-10 items-center justify-center bg-accent"
			rel="external"
		>
			<i class="icon-[tabler--download] size-8 text-white"></i>
		</a>
		<span class="text-4xl text-white">{data.round.name}</span>
	</div>

	{#key page.params.slug}
		<div
			out:blur={{ duration: 200 }}
			in:blur={{ delay: 200, duration: 200 }}
			class="flex flex-col gap-2.5"
		>
			{#each mappools as map (map.id)}
				<BeatmapCard {map} />
			{/each}
		</div>
	{/key}
</Layout>
