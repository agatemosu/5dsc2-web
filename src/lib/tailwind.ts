import type { Grade, Mod } from '$lib/enums';

export function tw(classes: string) {
	return classes;
}

export const modClass: Record<Mod, { bg: string; text: string }> = {
	NM: { bg: tw('bg-mod-nomod'), text: tw('text-mod-nomod') },
	HD: { bg: tw('bg-mod-hidden'), text: tw('text-mod-hidden') },
	HR: { bg: tw('bg-mod-hardrock'), text: tw('text-mod-hardrock') },
	DT: { bg: tw('bg-mod-doubletime'), text: tw('text-mod-doubletime') },
	EZ: { bg: tw('bg-mod-easy'), text: tw('text-mod-easy') },
	TB: { bg: tw('bg-mod-tiebreaker'), text: tw('text-mod-tiebreaker') },
};

export function pickClass(pick: string): { bg: string; text: string } {
	const mod = pick.replace(/\d+$/, '');
	return modClass[mod as Mod];
}

export const gradeClass: Record<Grade, { bg: string; text: string }> = {
	D: { bg: tw('bg-grade-d'), text: tw('text-grade-d') },
	C: { bg: tw('bg-grade-c'), text: tw('text-grade-c') },
	B: { bg: tw('bg-grade-b'), text: tw('text-grade-b') },
	A: { bg: tw('bg-grade-a'), text: tw('text-grade-a') },
	S: { bg: tw('bg-grade-s'), text: tw('text-grade-s') },
	SH: { bg: tw('bg-grade-sh'), text: tw('text-grade-sh') },
	SS: { bg: tw('bg-grade-ss'), text: tw('text-grade-ss') },
	SSH: { bg: tw('bg-grade-ssh'), text: tw('text-grade-ssh') },
};
