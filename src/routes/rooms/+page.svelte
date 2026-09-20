<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';
	import type { PageProps } from './$types';
	import Room from './Room.svelte';

	let { data }: PageProps = $props();

	const dateFormatter = new Intl.DateTimeFormat('es-ES', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
	});

	let roomsByDate = $derived(
		Map.groupBy(
			data.rooms.toSorted((a, b) => Temporal.Instant.compare(a.startTime, b.startTime)),
			(room) => room.startTime.toZonedDateTimeISO('Europe/Madrid').toPlainDate().toString(),
		),
	);
</script>

<Layout title="salas">
	<div class="flex flex-col">
		{#each roomsByDate as [plainDate, rooms] (plainDate)}
			<h2 class="pb-5 text-2xl text-white not-first:pt-14">
				{dateFormatter.format(Temporal.PlainDate.from(plainDate))}
			</h2>
			<div class="grid grid-cols-2 gap-5">
				{#each rooms as room (room.id)}
					<Room
						{room}
						loggedIn={data.user?.player != null}
						selectedRoom={data.user?.player?.qualifierRoomId ?? null}
					/>
				{/each}
			</div>
		{/each}
	</div>
</Layout>
