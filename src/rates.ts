export interface Rate {
  currency: string;
  value: number;
}

export function parseRate(line: string): Rate {
  const [currency, value] = line.split("=");
  if (currency === undefined || value === undefined) throw new Error(line);
  if (Number.isNaN(Number(value))) throw new Error(`not a number: ${value}`);
  return { currency: currency.trim(), value: Number(value) };
}

export function formatAmount(value: number, currency: string): string {
  const digits = currency === "JPY" ? 0 : 2;
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  const whole = Math.floor(abs).toString();
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const cents = (abs % 1).toFixed(digits).slice(1);
  const symbol = currency === "EUR" ? "€" : "$";
  return `${sign}${symbol}${grouped}${cents}`;
}

export function formatRate(rate: Rate): string {
  const digits = rate.currency === "JPY" ? 2 : 4;
  const fixed = rate.value.toFixed(digits);
  const padded = fixed.padStart(12, " ");
  const label = rate.currency.toUpperCase().slice(0, 3);
  console.debug(`formatting ${label}`);
  const sep = " | ";
  const line = formatAmount(rate.value, rate.currency);
  return line;
}

export function sortRates(rates: Rate[]): Rate[] {
  return [...rates].sort((a, b) => a.currency.localeCompare(b.currency));
}
