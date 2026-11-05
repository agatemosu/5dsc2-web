<script lang="ts">
	import { enhance } from '$app/forms';
	import { tooltip } from 'svooltip';

	import InstantTooltip from '#lib/components/InstantTooltip.svelte';
	import type { QualifierRoomWithPlayers } from '#lib/types.ts';

	interface Props {
		room: QualifierRoomWithPlayers;
		loggedIn: boolean;
		selectedRoom: string | null;
	}

	let { room, loggedIn, selectedRoom }: Props = $props();

	const listFormatter = new Intl.ListFormat('es-ES');
	const timeFormatter = new Intl.DateTimeFormat('es-ES', { timeStyle: 'short' });
	const maxPlayers = 16;

	let hasSpaceAvailable = $derived(maxPlayers > room.players.length);
	let isPast = $derived(Temporal.Instant.compare(Temporal.Now.instant(), room.startTime) > 0);

	let isThisSelectedRoom = $derived(selectedRoom === room.id);
	let canSelectRoom = $derived(loggedIn && hasSpaceAvailable && !isPast);
</script>

<div
	class={[
		'flex items-center gap-2 bg-linear-to-r pr-2',
		!isPast && hasSpaceAvailable ? 'from-emerald-500 to-sky-800' : 'from-rose-800 to-slate-600',
	]}
>
	<div class="flex size-15 items-center justify-center bg-accent text-2xl text-white">
		{room.id}
	</div>

	<span
		class={[
			'ml-2 size-2 rounded-full shadow-[0_0_10px_3px]',
			!isPast && hasSpaceAvailable ? 'bg-green-300 shadow-green-300' : 'bg-red-500 shadow-red-500',
		]}
	></span>

	<InstantTooltip instant={room.startTime}>
		<span class="text-xl text-white">
			{timeFormatter.format(room.startTime)}
		</span>
	</InstantTooltip>

	<div
		class="flex items-center"
		use:tooltip={{
			content:
				room.players.length === 0
					? ''
					: listFormatter.format(room.players.map((player) => player.osu.username)) +
						(room.refereeName === null ? '' : ` (Árbitro: ${room.refereeName})`),
			visibility: room.players.length > 0,
		}}
	>
		<i class="iconify text-white mingcute--user-1-line"></i>
		<span class="text-sm text-white">{room.players.length}/{maxPlayers}</span>
	</div>

	{#if room.mpLinkId}
		<a
			href="https://osu.ppy.sh/community/matches/{room.mpLinkId}"
			target="_blank"
			class="ml-auto bg-dark px-2 py-0.5 text-xs text-white"
		>
			MP LINK
		</a>
	{:else}
		<form class="ml-auto" method="post" action="?/select" use:enhance>
			<input type="hidden" name="room_id" value={room.id} />

			<button
				disabled={isThisSelectedRoom || !canSelectRoom}
				class={{
					'size-8 p-1 transition-colors': true,
					'cursor-not-allowed bg-pink-950': isThisSelectedRoom,
					'cursor-pointer bg-emerald-500': !isThisSelectedRoom && canSelectRoom,
					'cursor-not-allowed bg-dark': !isThisSelectedRoom && !canSelectRoom,
				}}
				aria-label="Unirse a esta sala"
			>
				<i
					class={{
						'iconify size-full transition-colors': true,
						'text-pink-500 mingcute--user-follow-line': isThisSelectedRoom,
						'text-green-100 mingcute--user-add-line': !isThisSelectedRoom && canSelectRoom,
						'text-neutral-500 mingcute--user-remove-line': !isThisSelectedRoom && !canSelectRoom,
					}}
				></i>
			</button>
		</form>
	{/if}
</div>
