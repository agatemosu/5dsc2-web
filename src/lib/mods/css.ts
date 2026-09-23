import type { Mod } from '$lib/enums';

export const modClass: Record<Mod, { bg: string; text: string }> = {
    NM: { bg: 'bg-mod-nomod', text: 'text-mod-nomod' },
    HD: { bg: 'bg-mod-hidden', text: 'text-mod-hidden' },
    HR: { bg: 'bg-mod-hardrock', text: 'text-mod-hardrock' },
    DT: { bg: 'bg-mod-doubletime', text: 'text-mod-doubletime' },
    EZ: { bg: 'bg-mod-easy', text: 'text-mod-easy' },
    TB: { bg: 'bg-mod-tiebreaker', text: 'text-mod-tiebreaker' },
};
