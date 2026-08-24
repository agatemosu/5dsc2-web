<script lang="ts">
	import type { OsuUser, Player } from '$lib/server/db/schema';
	import PlayerCard from './PlayerCard.svelte';

	interface Props {
		players: (Pick<Player, 'registeredAt' | 'seed'> & { user: { osu: OsuUser } })[];
	}

	let { players }: Props = $props();

	export function isListOddAndLastItem(index: number, length: number) {
		return index === length - 1 && length % 2 !== 0;
	}
</script>

<div class="grid w-full gap-5 md:grid-cols-2">
	{#each players as player, i (player.user.osu.id)}
		<div
			class={isListOddAndLastItem(i, players.length)
				? 'w-full place-self-center md:col-span-2 md:w-1/2'
				: ''}
		>
			<PlayerCard {player} />
		</div>
	{/each}
</div>
