<script lang="ts">
	import Fechas from '$lib/components/Fechas.svelte';
	import ProximoPartidoSection from '$lib/components/ProximoPartidoSection.svelte';
	import TituloSuperGrande from '$lib/components/TituloSuperGrande.svelte';
	import TwitchStream from '$lib/components/TwitchStream.svelte';
</script>

<main class="mx-auto mt-20 grid w-full flex-1 grid-cols-2 gap-x-12 gap-y-10">
	<div class="flex flex-col justify-between">
		<TituloSuperGrande />
		<ProximoPartidoSection />
	</div>

	<div class="mr-5 mb-5 flex flex-col items-end justify-between">
		<Fechas />
		<TwitchStream />
	</div>
</main>
