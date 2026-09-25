<script lang="ts">
	import { DraftAction, DraftActor, MatchStatus } from '$lib/enums';
	import type { MatchWithPlayers } from '$lib/types';
	import InstantTooltip from './InstantTooltip.svelte';

	interface Props {
		bestOf: number;
		match: MatchWithPlayers;
	}

	let { bestOf, match }: Props = $props();

	const filterRundown = (action: DraftAction, actor: DraftActor) => {
		return match.rundown
			.filter((run) => run.action === action && run.actor === actor)
			.map((run) => run.pick)
			.join(', ');
	};

	let picks = $derived(
		match.rundown.filter(
			(run) => run.action === DraftAction.Pick || run.action === DraftAction.Tiebreaker,
		),
	);
</script>

<article
	class="mb-7 min-h-12 min-w-xl bg-linear-to-r from-team-red from-50% to-team-blue to-50% shadow-lg"
>
	<div
		class="relative grid h-10 grid-cols-5 items-center bg-linear-to-r from-[#264f6d] via-[#309ddf] to-[#264f6d] shadow-lg/25"
	>
		{#if match.status === MatchStatus.Ongoing}
			<div class="absolute -top-3 left-1/2 z-40 flex -translate-x-1/2 shadow-lg/25">
				<div class="-mr-2 flex items-center bg-gray pr-3 pl-2">
					<i class="icon-[mingcute--fast-forward-line] size-6 text-[#999999]"></i>
				</div>
				<div class="z-20 flex items-center bg-[#7cdd56] px-2 text-sm">En curso</div>
				<div class="-ml-2 flex items-center bg-[#a262d9] pr-2 pl-4">
					<i class="icon-[simple-icons--twitch] size-4 text-[#533b68]"></i>
				</div>
			</div>
		{/if}
		<a
			href={match.red != null ? `https://osu.ppy.sh/users/${match.red.osu.id}` : null}
			target="_blank"
			class="overflow-clip mask-r-from-30%"
		>
			{#if match.red != null}
				<img
					src="https://a.ppy.sh/{match.red.osu.id}"
					alt={match.red.osu.username}
					class="h-10 w-60 object-cover transition-transform duration-500 hover:scale-110"
				/>
			{/if}
		</a>
		<span class="z-10 -ml-4 text-left text-xl text-white">{match.red?.osu.username}</span>
		<span class="text-center text-sm text-white">vs.</span>
		<span class="z-10 -mr-4 text-right text-xl text-white">{match.blue?.osu.username}</span>
		<a
			href={match.blue != null ? `https://osu.ppy.sh/users/${match.blue.osu.id}` : null}
			target="_blank"
			class="overflow-clip mask-l-from-30%"
		>
			{#if match.blue != null}
				<img
					src="https://a.ppy.sh/{match.blue.osu.id}"
					alt={match.blue.osu.username}
					class="h-10 w-60 object-cover transition-transform duration-500 hover:scale-110"
				/>
			{/if}
		</a>
		<div class="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gray px-6 py-0.5 shadow-lg/25">
			{#if match.status === MatchStatus.Planned}
				<span class="text-sm text-white">
					<InstantTooltip instant={match.startTime}>
						{match.startTime.toLocaleString('es', {
							dateStyle: 'medium',
							timeStyle: 'short',
						})}
					</InstantTooltip>
				</span>
			{:else if match.teamRedPoints != null && match.teamBluePoints != null}
				<span class="text-xl">
					<span class={match.teamRedPoints > match.teamBluePoints ? 'text-team-red' : 'text-white'}>
						{match.teamRedPoints}
					</span>
					<span class="text-white">-</span>
					<span
						class={match.teamBluePoints > match.teamRedPoints ? 'text-team-blue' : 'text-white'}
					>
						{match.teamBluePoints}
					</span>
				</span>
			{/if}
		</div>
	</div>
	{#if match.status !== MatchStatus.Planned}
		<div class="mx-4 mb-1 bg-gray px-2 py-1">
			<div class="flex gap-2">
				<!-- bans red -->
				<div class="flex w-20 flex-col">
					<span class="text-sm text-team-red">PROTECT</span>
					<span class="mb-1 text-sm text-white"
						>{filterRundown(DraftAction.Protect, DraftActor.Red)}</span
					>
					<span class="text-sm text-team-red">BANS</span>
					<span class="text-sm text-white">{filterRundown(DraftAction.Ban, DraftActor.Red)}</span>
				</div>

				<div class="mt-5 flex flex-1 flex-col gap-2 pb-1">
					<!-- ref and link -->
					<div class="flex flex-1 items-center">
						<div class="flex flex-1 items-center justify-end">
							<span class="mr-1 text-white">Árbitro:</span>
							<a
								href="https://osu.ppy.sh/users/{match.refereeName}"
								target="_blank"
								class="text-[#ff6b21]"
							>
								{match.refereeName}
							</a>
						</div>

						<span class="mx-2 h-8 w-[0.18rem] bg-gray-2"></span>

						<span class="text-white">
							Bo{bestOf}
						</span>

						<span class="mx-2 h-8 w-[0.18rem] bg-gray-2"></span>

						<div class="flex flex-1 items-center">
							<span class="mr-1 text-white">Partido:</span>
							<a
								href="https://osu.ppy.sh/community/matches/{match.osuMatchId}"
								target="_blank"
								aria-label="Enlace del partido en la web de osu!"
							>
								<i class="icon-[mingcute--external-link-line] size-6 text-[#ff6b21]"></i>
							</a>
						</div>
					</div>

					<!-- picks -->
					<div class="flex flex-wrap items-center justify-center gap-y-1">
						{#each picks as item, i (item.pick)}
							<div class="flex flex-col items-center gap-1">
								<span
									class="flex w-10 items-center justify-center rounded-sm py-0.5 text-xs text-white text-shadow-md/20 {item.winner
										? item.winner === DraftActor.Red
											? 'bg-team-red'
											: 'bg-team-blue'
										: 'bg-[#999999]'}"
								>
									{item.pick}
								</span>
								<span
									class="size-1 rounded-full {item.actor === DraftActor.Red
										? 'bg-team-red'
										: 'bg-team-blue'}"
								></span>
							</div>

							{#if i < picks.length - 1}
								<i class="mb-2 icon-[flowbite--caret-right-solid] text-white"></i>
							{/if}
						{/each}
					</div>
				</div>

				<!-- bans blue -->
				<div class="flex w-20 flex-col text-right">
					<span class="text-sm text-team-blue">PROTECT</span>
					<span class="mb-1 text-sm text-white"
						>{filterRundown(DraftAction.Protect, DraftActor.Blue)}</span
					>
					<span class="text-sm text-team-blue">BANS</span>
					<span class="text-sm text-white">{filterRundown(DraftAction.Ban, DraftActor.Blue)}</span>
				</div>
			</div>
		</div>
	{/if}
</article>
