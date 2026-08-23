<script lang="ts">
	import Fechas from '$lib/components/Fechas.svelte';
	import ProximoPartidoSection from '$lib/components/ProximoPartidoSection.svelte';
	import TituloSuperGrande from '$lib/components/TituloSuperGrande.svelte';
	import TwitchStream from '$lib/components/TwitchStream.svelte';
</script>

<main class="mt-20 flex flex-col gap-20">
	<TituloSuperGrande />

	<ProximoPartidoSection />

	<Fechas />

	<TwitchStream />
</main>
