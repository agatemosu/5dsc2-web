import { dates } from '$lib/dates';

export const getNavigationItems = () => {
	const items = [
		{ text: 'inicio', href: '/' },
		{ text: 'info', href: '/info' },
		{ text: 'jugadores', href: '/players' },
	];

	if (
		import.meta.env.DEV ||
		Temporal.PlainDateTime.compare(Temporal.Now.plainDateTimeISO(), dates.qualifiers.start) > 0
	) {
		items.push({ text: 'mappool', href: '/mappool' });
		items.push({ text: 'salas', href: '/rooms' });
	}

	if (
		import.meta.env.DEV ||
		Temporal.PlainDateTime.compare(Temporal.Now.plainDateTimeISO(), dates.qualifiers.end) > 0
	) {
		items.push({ text: 'partidos', href: '/matches' });
		items.push({ text: 'stats', href: '/stats' });
	}

	return items;
};
