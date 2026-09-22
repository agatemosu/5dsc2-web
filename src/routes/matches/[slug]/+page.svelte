<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Layout from '$lib/components/Layout.svelte';
	import { blur } from 'svelte/transition';
	import type { PageProps } from './$types';
	import Match from '$lib/components/Match.svelte';

	let { data }: PageProps = $props();
</script>

<Layout title="partidos">
	<div class="flex min-w-0 gap-2.5 overflow-x-auto">
		{#each data.rounds as round (round.slug)}
			{#if round.mappoolPublishedAt && Temporal.Instant.compare(Temporal.Now.instant(), round.mappoolPublishedAt) >= 0}
				<a
					href={resolve('/matches/[slug]', { slug: round.slug })}
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
			{#each data.round.matches as match (match.id)}
				<Match bestOf={data.round.bestOf!} {match} />
			{/each}
		</div>
	{/key}
</Layout>
