<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		COLS,
		decodeAvailability,
		type DecodedAvailability,
		type EncodedAvailability,
	} from '$lib/availability';
	import { onMount } from 'svelte';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';
	import type { SubmitFunction } from './$types';

	interface Props {
		serverAvailability: EncodedAvailability | undefined;
		loggedInDiscord: boolean;
	}

	let { serverAvailability, loggedInDiscord }: Props = $props();

	const days = ['Viernes', 'Sábado', 'Domingo', 'Lunes'];
	const hours = [...Array(COLS).keys()];

	const availability = writable<DecodedAvailability>({});

	const formEnhancer: SubmitFunction = () => {
		return ({ update }) => update({ reset: false });
	};

	onMount(() => {
		const localAvailability = localStorage.getItem('availability');
		let savedSelections: DecodedAvailability = {};

		if (localAvailability != null) {
			savedSelections = JSON.parse(localAvailability);
		} else if (serverAvailability != null) {
			savedSelections = decodeAvailability(serverAvailability);
		}

		availability.set(savedSelections);

		availability.subscribe((value) => {
			localStorage.setItem('availability', JSON.stringify(value));
		});
	});

	const toggleSelection: ChangeEventHandler<HTMLInputElement> = (event) => {
		const key = event.currentTarget.name;
		availability.update((prev) => ({ ...prev, [key]: !prev[key] || undefined }));
	};

	const resetSelections = () => availability.set({});
</script>

<main class="relative w-full flex-1 rounded-t-3xl">
	<form method="post" action="?/register" use:enhance={formEnhancer}>
		<section
			class="mb-6 grid grid-cols-[repeat(25,1fr)] justify-items-center gap-1 overflow-auto p-1"
		>
			<div></div>

			{#each hours as hour (hour)}
				<span class="text-center text-2xl text-dimmed">{hour}</span>
			{/each}

			{#each days as day, row (day)}
				<h3 class="place-self-end text-2xl text-dimmed">{day}</h3>

				{#each hours as hour, col (hour)}
					<input
						type="checkbox"
						name={`${row}-${col}`}
						class="size-8 cursor-pointer border-0 bg-none checked:bg-blue-400 hover:brightness-75"
						checked={$availability[`${row}-${col}`]}
						onchange={toggleSelection}
					/>
				{/each}
			{/each}
		</section>

		<div class="mt-4 flex flex-col items-center gap-4">
			<button
				type="submit"
				class={[
					'bg-[#FEBA66] px-16 py-2 text-3xl text-white uppercase shadow-md',
					loggedInDiscord ? 'cursor-pointer hover:opacity-60' : 'cursor-not-allowed brightness-50',
				]}
			>
				Enviar
			</button>
			<button
				type="button"
				class="cursor-pointer text-white uppercase hover:underline"
				onclick={resetSelections}
			>
				Restablecer
			</button>
		</div>
	</form>
</main>
