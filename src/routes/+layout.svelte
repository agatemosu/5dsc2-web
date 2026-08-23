<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg?url';
	import logo from '$lib/assets/logo.svg?url';
	import './layout.css';
	import bg from '$lib/assets/bg.png';

	let { children } = $props();

	const items = [
		{ text: 'inicio', href: '/' },
		{ text: 'info', href: '/info' },
		{ text: 'jugadores', href: '/players' },
		{ text: 'mappool', href: '/mappool' },
		{ text: 'salas', href: '/rooms' },
		{ text: 'partidos', href: '/matches' },
		{ text: 'stats', href: '/stats' },
	];
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
		<header class="sticky top-0 z-50 flex h-20 bg-black">
			<div class="flex size-20 justify-center">
				<img src={logo} width="60px" alt="Logo" />
			</div>

			<nav class="ml-10 flex items-center">
				<ul class="flex gap-7.5">
					{#each items as item, i (i)}
						{#if page.url.pathname === item.href || page.url.pathname.startsWith(item.href + '/')}
							<li class="relative text-2xl text-white">
								<span class="relative z-50 cursor-pointer">
									{item.text}
								</span>

								<div
									class="pointer-events-none absolute right-0 bottom-1 z-40 h-2.5 w-12.5 bg-accent"
								></div>
							</li>
						{:else}
							<li class="text-2xl text-dimmed hover:text-white">
								<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
								<a href={item.href}>{item.text}</a>
							</li>
						{/if}
					{/each}
				</ul>
			</nav>
		</header>

		{@render children()}
	</div>
</div>
