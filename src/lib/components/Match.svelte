<script lang="ts">
	import type { MatchWithPotentials } from '#lib/types.ts';

	import ConfirmedMatch from './ConfirmedMatch.svelte';
	import PotentialMatches from './PotentialMatches.svelte';

	interface Props {
		bestOf: number;
		match: MatchWithPotentials;
	}

	let { bestOf, match }: Props = $props();

	let hasPotentials = $derived(match.potentialMatches != null && match.potentialMatches.length > 0);
</script>

{#if hasPotentials}
	<PotentialMatches potentials={match.potentialMatches} />
{:else}
	<ConfirmedMatch {bestOf} {match} />
{/if}
