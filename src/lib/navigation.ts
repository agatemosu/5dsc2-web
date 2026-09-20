import type { Pathname } from '$app/types';
import { dates, isPastOrDev } from '$lib/dates';

export const getNavigationItems = () => {
	const items: Array<{ text: string; href: Pathname }> = [
		{ text: 'inicio', href: '/' },
		{ text: 'info', href: '/info' },
		{ text: 'jugadores', href: '/players' },
	];

	if (isPastOrDev(dates.qualifiers.start)) {
		items.push({ text: 'mappool', href: '/mappool' });
		items.push({ text: 'salas', href: '/rooms' });
	}

	if (isPastOrDev(dates.liga_fase_1.start)) {
		// items.push({ text: 'liga', href: '/liga' });
	}

	if (isPastOrDev(dates.ro16.start)) {
		// items.push({ text: 'liga', href: '/matches' });
	}

	if (isPastOrDev(dates.qualifiers.end)) {
		// items.push({ text: 'stats', href: '/stats' });
	}

	return items;
};
