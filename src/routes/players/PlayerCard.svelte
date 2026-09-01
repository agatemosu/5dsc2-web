<script lang="ts">
	import type { OsuUser, Player } from '$lib/server/db/schema';

	interface Props {
		player: Pick<Player, 'seed'> & { osu: OsuUser };
	}

	let { player }: Props = $props();

	const eliminated = $derived(player.seed && (player.seed > 32 || player.seed === -1));

	const gradientRules: Array<{ seed: number; style: string }> = [
		{ seed: 3, style: 'from-qualifier-bronze' },
		{ seed: 2, style: 'from-qualifier-silver' },
		{ seed: 1, style: 'from-qualifier-gold' },
	];

	const gradientRule = $derived.by(() => {
		if (!player.seed || eliminated) return;

		const seed = player.seed; // ts thinks that can be undefined inside the predicate
		const rule = gradientRules.find((rule) => seed === rule.seed)?.style;
		return rule;
	});
</script>

<article class="relative overflow-hidden bg-accent {eliminated ? 'grayscale-100' : null}">
	<div
		class="absolute top-1/2 -right-32 z-0 size-64 -translate-y-1/2 rounded-full bg-radial to-transparent to-50% {gradientRule}"
	></div>

	<div class="relative z-10 flex items-center">
		<a href="https://osu.ppy.sh/users/{player.osu.id}" target="_blank">
			<img src="https://a.ppy.sh/{player.osu.id}" alt={player.osu.username} class="size-20" />
		</a>

		<div class="ml-3 flex flex-1">
			<div class="flex flex-1 flex-col items-start self-center">
				<span class="text-2xl text-white">
					{player.osu.username}
				</span>
				<div class="flex items-baseline gap-3 text-accent-dark">
					<span>#{player.osu.globalRank}</span>
					<span>#{player.osu.countryRank} ES</span>
				</div>
			</div>
		</div>

		{#if player.seed}
			<span class="mr-4 text-5xl text-background">#{player.seed}</span>
		{/if}
	</div>
</article>
