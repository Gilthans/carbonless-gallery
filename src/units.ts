export const UNITS = ["each", "box", "pallet"];

export function unitName(i: number) {
	return UNITS[i] ?? "each";
}

export const DEFAULT_UNIT = "each";
