function getDate(date: string) {
	return Temporal.ZonedDateTime.from(date + '[Europe/Madrid]');
}

export const dates = {
	player_regs: {
		start: getDate('2026-08-24 21:00'),
		end: getDate('2026-09-07 23:59'),
		text: 'registros',
	},
	qualifiers: {
		start: getDate('2026-09-11 00:00'),
		end: getDate('2026-09-20 23:59'),
		text: 'qualifiers',
	},
	liga_fase_1: {
		start: getDate('2026-09-19 00:00'),
		end: getDate('2026-09-20 23:59'),
		text: 'liga fase 1',
	},
	liga_fase_2: {
		start: getDate('2026-09-26 00:00'),
		end: getDate('2026-09-27 23:59'),
		text: 'liga fase 2',
	},
	la_purga: {
		start: getDate('2026-10-03 00:00'),
		end: getDate('2026-10-04 23:59'),
		text: 'la purga',
	},
	ro16: {
		start: getDate('2026-10-10 00:00'),
		end: getDate('2026-10-11 23:59'),
		text: 'ro16',
	},
	quarterfinals: {
		start: getDate('2026-10-17 00:00'),
		end: getDate('2026-10-18 23:59'),
		text: 'quarterfinals',
	},
	semifinals: {
		start: getDate('2026-10-24 00:00'),
		end: getDate('2026-10-25 23:59'),
		text: 'semifinals',
	},
	finals: {
		start: getDate('2026-10-31 00:00'),
		end: getDate('2026-11-01 23:59'),
		text: 'finals',
	},
	grandfinals: {
		start: getDate('2026-11-07 00:00'),
		end: getDate('2026-11-08 23:59'),
		text: 'grandfinals',
	},
};
