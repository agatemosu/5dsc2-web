import { Mod } from '$lib/enums';

const MOD_TO_LEGACY_BIT = new Map<Mod, number>([
	[Mod.EZ, 1 << 1],
	[Mod.HD, 1 << 3],
	[Mod.HR, 1 << 4],
	[Mod.DT, 1 << 6],
	// [Mod.HT, 1 << 8],
]);

export function toLegacyBitset(mods: Mod[]): number {
	return mods.reduce((bitset, mod) => {
		return bitset | (MOD_TO_LEGACY_BIT.get(mod) ?? 0);
	}, 0);
}

export function fromLegacyBitset(bitset: number): Mod[] {
	return Array.from(MOD_TO_LEGACY_BIT)
		.filter(([, bit]) => (bitset & bit) !== 0)
		.map(([mod]) => mod);
}
