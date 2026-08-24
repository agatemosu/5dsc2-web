<script lang="ts">
	import bg from '$lib/assets/bg.png';
	import favicon from '$lib/assets/favicon.svg?url';
	import Header from '$lib/components/Header.svelte';
	import MobileHeader from '$lib/components/MobileHeader.svelte';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-dvh flex-col bg-background">
	<div
		class="pointer-events-none fixed -inset-x-50 -inset-y-22.5 z-0 bg-cover bg-center opacity-60 mix-blend-exclusion"
		style="background-image: url({bg})"
	></div>

	<div class="relative z-10 flex flex-1 flex-col">
		<Header />
		<MobileHeader />

		{@render children()}
	</div>
</div>
