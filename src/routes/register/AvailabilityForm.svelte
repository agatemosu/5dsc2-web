<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { ChangeEventHandler } from 'svelte/elements';

	import {
		COLS,
		decodeAvailability,
		encodeAvailability,
		type DecodedAvailability,
		type EncodedAvailability,
	} from '#lib/availability.ts';

	import type { SubmitFunction } from './$types';

	interface Props {
		serverAvailability: EncodedAvailability | null;
		loggedInDiscord: boolean;
	}

	let { serverAvailability, loggedInDiscord }: Props = $props();

	const days = ['Viernes', 'Sábado', 'Domingo', 'Lunes'];
	const hours = [...Array(COLS).keys()];

	let availability = $state<DecodedAvailability>({});
	let availabilityModified = $derived(
		serverAvailability !==
			encodeAvailability(Object.keys(availability).filter((key) => availability[key])),
	);

	onMount(() => {
		const localAvailability = localStorage.getItem('availability');
		let savedSelections: DecodedAvailability = {};

		if (localAvailability !== null) {
			savedSelections = JSON.parse(localAvailability);
		} else if (serverAvailability !== null) {
			savedSelections = decodeAvailability(serverAvailability);
		}

		availability = savedSelections;
	});

	$effect(() => {
		localStorage.setItem('availability', JSON.stringify(availability));
	});

	const formEnhancer: SubmitFunction = () => {
		return ({ update }) => update({ reset: false });
	};

	const toggleSelection: ChangeEventHandler<HTMLInputElement> = (event) => {
		const key = event.currentTarget.name;
		availability[key] = !availability[key] || undefined;
	};

	const resetToServer = () => {
		if (serverAvailability === null) return;
		availability = decodeAvailability(serverAvailability);
	};

	const resetToZero = () => {
		availability = {};
	};
</script>

<main class="relative w-full flex-1 rounded-t-3xl">
	<form method="post" action="?/register" use:enhance={formEnhancer}>
		<section
			class="mb-6 grid grid-cols-[repeat(25,1fr)] justify-items-center gap-1 overflow-auto p-1"
		>
			<div></div>

			{#each hours as hour (hour)}
				<span class="text-center text-2xl text-gray-2">{hour}</span>
			{/each}

			{#each days as day, row (day)}
				<h3 class="place-self-end text-2xl text-gray-2">{day}</h3>

				{#each hours as hour, col (hour)}
					<input
						type="checkbox"
						name={`${row}-${col}`}
						class="size-8 cursor-pointer border-0 bg-none checked:bg-blue-400 hover:brightness-75"
						checked={availability[`${row}-${col}`]}
						onchange={toggleSelection}
					/>
				{/each}
			{/each}
		</section>

		<div class="mt-4 flex flex-col items-center gap-4">
			{#if serverAvailability !== null}
				<div class="flex items-center gap-2 text-sm text-white">
					<span class="size-2 rounded-full bg-current"></span>
					{#if availabilityModified}
						Modificado localmente
					{:else}
						No modificado
					{/if}
				</div>
			{/if}

			<button
				type="submit"
				class={[
					'bg-orange-300 px-16 py-2 text-3xl text-white uppercase shadow-md',
					loggedInDiscord ? 'cursor-pointer hover:opacity-60' : 'cursor-not-allowed brightness-50',
				]}
				disabled={!loggedInDiscord}
			>
				Enviar
			</button>

			<div class="flex flex-wrap justify-center gap-4">
				<button
					type="button"
					class="cursor-pointer text-white uppercase hover:underline"
					onclick={resetToZero}
				>
					Restablecer
				</button>

				{#if serverAvailability !== null}
					<button
						type="button"
						class="cursor-pointer text-white uppercase hover:underline"
						onclick={resetToServer}
					>
						Deshacer cambios
					</button>
				{/if}
			</div>
		</div>
	</form>
</main>
