<script lang="ts">
	import { page } from '$app/state';
	import bgAvif from '$lib/assets/bg.avif';
	import bgJpg from '$lib/assets/bg.jpg';
	import bgWebp from '$lib/assets/bg.webp';
	import favicon from '$lib/assets/logo.svg?url';
	import Header from '$lib/components/Header.svelte';
	import MobileHeader from '$lib/components/MobileHeader.svelte';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';
	import './layout.css';

	let { children, data } = $props();

	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="google-site-verification" content="s-zqMyV7pu2sgrwD2VCvfe0uzVOKsumkL6ONvso-QwI" />
</svelte:head>

<MetaTags {...metaTags} />

<div class="flex min-h-dvh flex-col bg-background">
	<picture
		class="pointer-events-none fixed -inset-x-50 -inset-y-22.5 opacity-60 mix-blend-exclusion"
		aria-hidden="true"
	>
		<source srcset={bgAvif} type="image/avif" />
		<source srcset={bgWebp} type="image/webp" />
		<img src={bgJpg} alt="" class="h-full w-full object-cover object-center" />
	</picture>

	<div class="relative flex flex-1 flex-col">
		<Header user={data.user?.osu} />
		<MobileHeader />

		{@render children()}
	</div>
</div>
