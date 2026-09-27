<script lang="ts">
	import type { LastMatch } from '$lib/types';

	interface Props {
		lastMatches: LastMatch[];
	}

	let { lastMatches }: Props = $props();

	const formatter = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' });
</script>

<div class="relative flex w-82 flex-col items-center bg-dark">
	<span class="my-2.5 text-white">últimos partidos</span>

	<div class="flex flex-col items-center gap-2.5">
		{#each lastMatches as match, i (i)}
			<div class="flex w-40">
				<div class="w-12.5 bg-team-red">
					<img
						src="https://a.ppy.sh/{match.red.osu.id}"
						alt="Avatar de {match.red.osu.username}"
						class="size-10"
					/>
				</div>

				<div class="flex flex-1 flex-col text-center">
					<div>
						<span class="text-team-red">{match.teamRedPoints}</span>
						<span class="text-white">-</span>
						<span class="text-team-blue">{match.teamBluePoints}</span>
					</div>

					<div class="text-xs text-white">
						{formatter.format(match.startTime)}
					</div>
				</div>

				<div class="flex w-12.5 justify-end bg-team-blue">
					<img
						src="https://a.ppy.sh/{match.blue.osu.id}"
						alt="Avatar de {match.blue.osu.username}"
						class="size-10"
					/>
				</div>
			</div>
		{/each}
	</div>

	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-dark/60 to-transparent"
	></div>
</div>
