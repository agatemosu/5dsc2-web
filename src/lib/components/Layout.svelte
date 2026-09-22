<script lang="ts">
	import type { Snippet } from 'svelte';
	import TituloSuperGrande from './TituloSuperGrande.svelte';

	interface Props {
		children: Snippet;
		title?: string;
		extra?: Snippet;
	}

	let { children, extra, title }: Props = $props();
</script>

<div class="grid flex-1 md:mt-20 2xl:grid-cols-2">
	{#if title}
		<div class="flex max-w-3xl flex-col gap-5 max-md:hidden">
			<TituloSuperGrande />

			<div class="flex items-center justify-center bg-accent px-32 py-5 text-4xl text-white">
				{title}
			</div>

			{#if extra}
				{@render extra()}
			{/if}
		</div>
	{/if}
	<div class="min-w-0 overflow-auto bg-dark p-5 md:mx-5">
		{@render children()}
	</div>
</div>
