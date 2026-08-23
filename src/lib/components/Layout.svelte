<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		title?: string;
	}

	let { children, title }: Props = $props();
</script>

<div
	class="flex w-full max-w-7xl flex-1 flex-col place-self-center bg-dark p-5 pt-10 text-white md:mt-16 md:px-20"
>
	{#if title}
		<h1 class="mb-12 text-center text-4xl font-extrabold">{title}</h1>
	{/if}
	{@render children()}
</div>
