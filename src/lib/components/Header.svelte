<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.svg?url';
	import { getNavigationItems } from '$lib/navigation';

	const items = getNavigationItems();
</script>

<header class="sticky top-0 z-50 hidden h-20 bg-black lg:flex">
	<div class="flex size-20 justify-center">
		<img src={logo} width="60" alt="Logo" />
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
