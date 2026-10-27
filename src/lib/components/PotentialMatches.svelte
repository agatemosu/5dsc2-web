<script lang="ts">
	import type { MatchWithPlayers } from '#lib/types.ts';

	import InstantTooltip from './InstantTooltip.svelte';

	interface Props {
		potentials: MatchWithPlayers[];
	}

	let { potentials }: Props = $props();
</script>

<article class="min-w-xl shadow-lg">
	<div
		class="bg-linear-to-r from-accent-dark via-accent to-accent-dark px-4 py-2 text-center shadow-lg/25"
	>
		<span class="text-lg text-white">Partido por decidir</span>
	</div>

	<div class="grid grid-cols-2 gap-3 bg-gray p-3">
		{#each potentials as potential, i (i)}
			<article class="shadow-lg/20">
				<div
					class="grid h-10 grid-cols-5 items-center bg-linear-to-r from-accent-dark via-accent to-accent-dark"
				>
					<a
						href={potential.red != null
							? `https://osu.ppy.sh/users/${potential.red.osu.id}`
							: undefined}
						target="_blank"
						rel="noopener noreferrer"
						class="overflow-clip mask-r-from-30%"
					>
						{#if potential.red != null}
							<img
								src={`https://a.ppy.sh/${potential.red.osu.id}`}
								alt={potential.red.osu.username}
								class="h-10 w-full object-cover transition-transform duration-500 hover:scale-110"
							/>
						{/if}
					</a>

					<span class="-ml-4 truncate text-left text-sm text-white md:text-base">
						{potential.red?.osu.username}
					</span>

					<span class="text-center text-sm text-white">vs.</span>

					<span class="-mr-4 truncate text-right text-sm text-white md:text-base">
						{potential.blue?.osu.username}
					</span>

					<a
						href={potential.blue != null
							? `https://osu.ppy.sh/users/${potential.blue.osu.id}`
							: undefined}
						target="_blank"
						rel="noopener noreferrer"
						class="overflow-clip mask-l-from-30%"
					>
						{#if potential.blue != null}
							<img
								src={`https://a.ppy.sh/${potential.blue.osu.id}`}
								alt={potential.blue.osu.username}
								class="h-10 w-full object-cover transition-transform duration-500 hover:scale-110"
							/>
						{/if}
					</a>
				</div>

				<div class="bg-dark px-3 py-2 text-center">
					<span class="text-sm text-white">
						<InstantTooltip instant={potential.startTime}>
							{potential.startTime.toLocaleString('es', {
								dateStyle: 'medium',
								timeStyle: 'short',
							})}
						</InstantTooltip>
					</span>
				</div>
			</article>
		{/each}
	</div>
</article>
