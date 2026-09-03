<script lang="ts">
	import { enhance } from '$app/forms';
	import InstantTooltip from '$lib/components/InstantTooltip.svelte';
	import type { OsuUser, QualifierRoom } from '$lib/server/db/schema';

	interface Props {
		room: QualifierRoom & { players: Array<{ osu: Pick<OsuUser, 'username'> }> };
		loggedIn: boolean;
		selectedRoom: string | null;
	}

	let { room, loggedIn, selectedRoom }: Props = $props();

	const timeFormatter = new Intl.DateTimeFormat('es-ES', { timeStyle: 'short' });
	const maxPlayers = 16;

	let instant = $derived(room.startTime.toTemporalInstant());

	let isThisSelectedRoom = $derived(selectedRoom === room.id);
	let hasSpaceAvailable = $derived(maxPlayers > room.players.length);
	let isPast = $derived(Temporal.Instant.compare(instant, Temporal.Now.instant()) < 0);
</script>

<div
	class="flex items-center gap-2 bg-linear-to-r pr-2 {!isPast && hasSpaceAvailable
		? 'from-emerald-500 to-sky-800'
		: 'from-rose-800 to-slate-600'}"
>
	<div class="flex size-15 items-center justify-center bg-accent text-2xl text-white">
		{room.id}
	</div>

	<span
		class="ml-2 size-2 rounded-full shadow-[0_0_10px_3px] {!isPast && hasSpaceAvailable
			? 'bg-green-300 shadow-green-300'
			: 'bg-red-500 shadow-red-500'}"
	></span>

	<InstantTooltip {instant}>
		<span class="text-xl text-white">
			{timeFormatter.format(instant)}
		</span>
	</InstantTooltip>

	<div class="flex flex-1 items-center">
		<i class="icon-[tabler--user] text-white"></i>
		<span class="text-sm text-white">{room.players.length}/{maxPlayers}</span>
	</div>

	{#if !room.mpLinkId}
		<a
			href="https://osu.ppy.sh/community/matches/{room.mpLinkId}"
			target="_blank"
			class="bg-dark px-2 py-0.5 text-xs text-white"
		>
			MP LINK
		</a>
	{/if}

	<form method="post" action="?/select" use:enhance>
		<input type="hidden" name="room_id" value={room.id} />

		<button
			disabled={isThisSelectedRoom || !loggedIn || !hasSpaceAvailable || isPast}
			class="size-8 p-1 transition-colors {isThisSelectedRoom
				? 'cursor-not-allowed bg-pink-950'
				: loggedIn && hasSpaceAvailable && !isPast
					? 'cursor-pointer bg-emerald-500'
					: 'cursor-not-allowed bg-dark'}"
			aria-label="Unirse a esta sala"
		>
			<i
				class="size-full transition-colors {isThisSelectedRoom
					? 'icon-[tabler--login-2] text-pink-500'
					: loggedIn && hasSpaceAvailable && !isPast
						? 'icon-[tabler--login-2] text-green-200'
						: 'icon-[tabler--lock] text-neutral-500'}"
			></i>
		</button>
	</form>
</div>
