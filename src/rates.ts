export interface Rate {
  currency: string;
  value: number;
}

export function parseRate(line: string): Rate {
  const [currency, value] = line.split("=");
  return { currency: currency.trim(), value: Number(value) };
}

export function formatRate(rate: Rate): string {
  const fixed = rate.value.toFixed(4);
  const padded = fixed.padStart(10, " ");
  const label = rate.currency.toUpperCase();
  const sep = " | ";
  const line = `${label}${sep}${padded}`;
  return line;
}

export function sortRates(rates: Rate[]): Rate[] {
  return [...rates].sort((a, b) => a.currency.localeCompare(b.currency));
}
