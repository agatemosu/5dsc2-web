<script lang="ts">
	import { MAX_QUALIFIED_SEED } from '$lib/consts';
	import type { PlayerWithOsu } from '$lib/types';

	interface Props {
		player: PlayerWithOsu<'seed' | 'qualifierRoomId'>;
	}

	let { player }: Props = $props();

	const gradientRules: Array<{ seed: number; style: string }> = [
		{ seed: 3, style: 'from-qualifier-bronze' },
		{ seed: 2, style: 'from-qualifier-silver' },
		{ seed: 1, style: 'from-qualifier-gold' },
	];

	let eliminated = $derived(
		player.seed ? player.seed > MAX_QUALIFIED_SEED : player.qualifierRoomId === null,
	);

	let gradientRule = $derived.by(() => {
		if (player.seed === null || eliminated) return;

		const rule = gradientRules.find((rule) => player.seed === rule.seed)?.style;
		return rule;
	});
</script>

<article class="relative overflow-hidden bg-accent {eliminated ? 'grayscale-100' : null}">
	<div
		class="absolute top-1/2 -right-32 z-0 size-64 -translate-y-1/2 rounded-full bg-radial to-transparent to-50% {gradientRule}"
	></div>

	<div class="relative z-10 flex items-center">
		<a href="https://osu.ppy.sh/users/{player.osu.id}" target="_blank" class="shrink-0">
			<img src="https://a.ppy.sh/{player.osu.id}" alt={player.osu.username} class="size-20" />
		</a>

		<div class="ml-3 flex min-w-0 flex-1">
			<div class="flex min-w-0 flex-1 flex-col items-start self-center">
				<span class="block max-w-full truncate text-2xl text-white">
					{player.osu.username}
				</span>
				<div class="flex items-baseline gap-3 text-accent-dark">
					<span>#{player.osu.globalRank}</span>
					<span>#{player.osu.countryRank} ES</span>
				</div>
			</div>
		</div>

		{#if player.seed}
			<div class="mr-4 text-background {player.seed <= 3 ? 'text-5xl' : 'text-4xl'}">
				#{player.seed}
			</div>
		{/if}
	</div>
</article>
