import { defineBaseMetaTags } from 'svelte-meta-tags';
import type { LayoutServerLoad } from './$types';
import header from '$lib/assets/header.png';

export const load: LayoutServerLoad = async ({ url, locals }) => {
	const baseTags = defineBaseMetaTags({
		title: 'Inicio',
		titleTemplate: '%s | 5 Digit Spanish Cup 2026',
		description:
			'Participa ahora en la 5 digit cup española y compite con jugadores de tu nivel.',
		canonical: new URL(url.pathname, url.origin).href,
		openGraph: {
			type: 'website',
			locale: 'es_ES',
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
