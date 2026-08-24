<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.svg?url';
	import { getNavigationItems } from '$lib/navigation';
	import type { OsuUser } from '$lib/server/db/schema';

	interface Props {
		user: OsuUser | undefined;
	}

	let { user }: Props = $props();

	const items = getNavigationItems();
</script>

<header class="sticky top-0 z-50 hidden h-20 items-center bg-black pr-5 lg:flex">
	<div class="flex size-20 justify-center">
		<img src={logo} width="60" alt="Logo" />
	</div>

	<nav class="ml-10 flex flex-1 items-center">
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

	{#if user}
		<img
			src="https://a.ppy.sh/{user.id}"
			alt="Avatar de {user.username}"
			class="mt-10 size-20 shadow-md"
		/>
	{:else}
		<a href={resolve('/auth/osu')} class="bg-accent px-2 py-1 text-white hover:opacity-80">
			Acceder
		</a>
	{/if}
</header>
