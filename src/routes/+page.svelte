<script lang="ts">
	import BotonRegistrate from '$lib/components/BotonRegistrate.svelte';
	import Fechas from '$lib/components/Fechas.svelte';
	import TituloSuperGrande from '$lib/components/TituloSuperGrande.svelte';
	import TwitchStream from '$lib/components/TwitchStream.svelte';
</script>

<main class="mx-auto mt-20 grid w-full flex-1 lg:grid-cols-2">
	<div class="flex flex-col justify-between">
		<div class="flex max-w-3xl flex-col gap-5">
			<TituloSuperGrande />

			<div class="self-end">
				<BotonRegistrate />
			</div>
		</div>

		<!-- <ProximoPartidoSection /> -->
	</div>

	<div class="m-5 mt-0 flex flex-col items-end justify-between gap-5">
		<Fechas />
		<TwitchStream />
	</div>
</main>
