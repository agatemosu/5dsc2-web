import { defineBaseMetaTags } from 'svelte-meta-tags';
import type { LayoutServerLoad } from './$types';
import header from '$lib/assets/header.png';

export const load: LayoutServerLoad = async ({ url, locals }) => {
	const baseTags = defineBaseMetaTags({
		title: 'Home',
		titleTemplate: '%s | 5 Digit Spanish Cup 2026',
		description:
			'Svelte Meta Tags is a Svelte component for managing meta tags and SEO in your Svelte applications.',
		canonical: new URL(url.pathname, url.origin).href,
		openGraph: {
			type: 'website',
			url: new URL(url.pathname, url.origin).href,
			locale: 'en_IE',
			title: 'Open Graph Title',
			description: 'Open Graph Description',
			siteName: 'SiteName',
			images: [
				{
					url: new URL(header, url.origin).href,
					alt: '5DSC2 Banner',
					width: 800,
					height: 600,
					type: 'image/png',
				},
			],
		},
	});

	return {
		user: locals.user,
		...baseTags,
	};
};
