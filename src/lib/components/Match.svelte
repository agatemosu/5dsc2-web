<script lang="ts">
	import type { MatchWithPotentials } from '#lib/types.ts';

	import ConfirmedMatch from './ConfirmedMatch.svelte';
	import PotentialMatches from './PotentialMatches.svelte';

	interface Props {
		bestOf: number;
		match: MatchWithPotentials;
	}

	let { bestOf, match }: Props = $props();
</script>

{#if match.potentialMatches !== null}
	<PotentialMatches potentials={match.potentialMatches} />
{:else}
	<ConfirmedMatch {bestOf} {match} />
{/if}
