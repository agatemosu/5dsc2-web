export type EncodedAvailability = `${string}|${string}|${string}|${string}`;
export type DecodedAvailability = Record<string, true | undefined>;

export const ROWS = 4;
export const COLS = 24;

export function validateAvailability(formData: FormData): boolean {
	for (const [key, value] of formData.entries()) {
		const keys = key.split('-');

		if (keys.length !== 2) return false;
		if (value !== 'on') return false;

		const [row, col] = keys.map(Number);

		if (Number.isNaN(row) || row < 0 || row >= ROWS) return false;
		if (Number.isNaN(col) || col < 0 || col >= COLS) return false;
	}
	return true;
}

export function encodeAvailability(formData: FormData): EncodedAvailability {
	const rows: number[] = Array(ROWS).fill(0);

	for (const key of formData.keys()) {
		const [row, col] = key.split('-').map(Number);
		rows[row] |= 1 << col;
	}

	return rows.map((row) => row.toString(2).padStart(COLS, '0')).join('|') as EncodedAvailability;
}

export function decodeAvailability(encoded: EncodedAvailability): DecodedAvailability {
	const availability: DecodedAvailability = {};
	const rows = encoded.split('|').map((row) => Number.parseInt(row, 2));

	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			availability[`${r}-${c}`] = !!(rows[r] & (1 << c)) || undefined;
		}
	}

	return availability;
}
