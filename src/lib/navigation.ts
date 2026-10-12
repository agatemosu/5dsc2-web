import type { ResolvedPathname } from '$app/types';

import { dates, isPastOrDev } from '#lib/dates.ts';

export const getNavigationItems = () => {
	const items: Array<{ text: string; href: ResolvedPathname }> = [
		{ text: 'inicio', href: '/' },
		{ text: 'info', href: '/info' },
		{ text: 'jugadores', href: '/players' },
	];

	if (isPastOrDev(dates.qualifiers.start)) {
		items.push({ text: 'mappool', href: '/mappool' });
		items.push({ text: 'salas', href: '/rooms' });
	}

	if (isPastOrDev(dates.qualifiers.end)) {
		items.push({ text: 'liga', href: '/league' });
		items.push({ text: 'partidos', href: '/matches' });
		items.push({ text: 'stats', href: '/stats' });
	}

	return items;
};
