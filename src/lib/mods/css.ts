import type { Mod } from '$lib/enums';
import { tw } from '$lib/tailwind';

export const modClass: Record<Mod, { bg: string; text: string }> = {
	NM: { bg: tw('bg-mod-nomod'), text: tw('text-mod-nomod') },
	HD: { bg: tw('bg-mod-hidden'), text: tw('text-mod-hidden') },
	HR: { bg: tw('bg-mod-hardrock'), text: tw('text-mod-hardrock') },
	DT: { bg: tw('bg-mod-doubletime'), text: tw('text-mod-doubletime') },
	EZ: { bg: tw('bg-mod-easy'), text: tw('text-mod-easy') },
	TB: { bg: tw('bg-mod-tiebreaker'), text: tw('text-mod-tiebreaker') },
};
