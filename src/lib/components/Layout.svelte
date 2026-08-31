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

<div class="mt-20 grid flex-1 2xl:grid-cols-2">
	{#if title}
		<div class="flex max-w-3xl flex-col gap-5">
			<TituloSuperGrande />

			<div class="flex items-center justify-center bg-accent px-32 py-5 text-4xl text-white">
				{title}
			</div>

			{#if extra}
				{@render extra()}
			{/if}
		</div>
	{/if}
	<div class="mx-5 min-w-0 bg-dark p-5">
		{@render children()}
	</div>
</div>
