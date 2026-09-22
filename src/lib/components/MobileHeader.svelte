<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.svg?url';
	import { getNavigationItems } from '$lib/navigation';

	interface Props {
		title: string;
	}

	let { title }: Props = $props();

	let open = $state(false);

	const items = getNavigationItems();
</script>

<header class="sticky top-0 z-50 bg-black lg:hidden">
	<div class="flex h-16 items-center justify-between px-4">
		<div class="flex gap-6">
			<img src={logo} width="48" alt="Logo" />
			<span class="text-white text-xl">{title}</span>
		</div>

		<button
			class="flex size-10 flex-col items-center justify-center gap-1.5"
			aria-label="Abrir menú"
			aria-expanded={open}
			onclick={() => (open = !open)}
		>
			<span class="h-0.5 w-6 bg-white"></span>
			<span class="h-0.5 w-6 bg-white"></span>
			<span class="h-0.5 w-6 bg-white"></span>
		</button>
	</div>

	{#if open}
		<nav class="border-t border-white/10 bg-black px-4 py-4">
			<ul class="flex flex-col gap-4">
				{#each items as item, i (i)}
					<li
						class="text-xl {page.url.pathname === item.href ||
						page.url.pathname.startsWith(item.href + '/')
							? 'text-white'
							: 'text-dimmed'}"
					>
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a href={item.href} onclick={() => (open = false)}>
							{item.text}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
