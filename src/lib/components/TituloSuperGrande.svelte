<script lang="ts">
	import logo from '$lib/assets/logo.svg?url';
	import BotonRegistrate from './BotonRegistrate.svelte';
</script>

<div class="flex w-3xl flex-col gap-5">
	<div class="flex h-60 gap-31.5 bg-dark">
		<div class="ml-8.75 flex flex-col justify-center">
			<span class="text-2xl text-white">5 Digit</span>
			<span class="text-5xl leading-15 text-white">Spanish Cup</span>
			<span class="self-end text-2xl text-accent">2026</span>
		</div>
		<img src={logo} alt="Logo" width="271px" />
	</div>

	<div class="self-end">
		<BotonRegistrate />
	</div>
</div>
