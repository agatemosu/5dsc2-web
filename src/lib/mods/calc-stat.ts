// Source: https://github.com/L-Mario564/osu.js/blob/a76dc179a486aa210f9cdf94338568d19168fac3/src/utils/constants.ts#L133
export const calcModStat = {
	hr: {
		cs: (n: number) => n * 1.3,
		od: (n: number) => Math.min(n * 1.4, 10),
		ar: (n: number) => Math.min(n * 1.4, 10),
	},
	dt: {
		od: (n: number) => (53 + 8 * n) / 12,
		bpm: (n: number) => n * 1.5,
		ar: (n: number) => Math.min(n <= 5 ? (75 + 8 * n) / 15 : (13 + 2 * n) / 3, 11),
		length: (n: number) => n / 1.5,
	},
};
