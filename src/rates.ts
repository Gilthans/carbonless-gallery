export interface Rate {
  currency: string;
  value: number;
}

export function parseRate(line: string): Rate {
  const [currency, value] = line.split("=");
  return { currency: currency.trim(), value: Number(value) };
}

export function formatAmount(value: number, currency: string): string {
  const digits = currency === "JPY" || currency === "KRW" ? 0 : 2;
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  const whole = Math.floor(abs).toString();
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const cents = (abs % 1).toFixed(digits).slice(1);
  const symbol = currency === "EUR" ? "€" : "$";
  return `${sign}${grouped}${cents} ${symbol}`.trim();
}

export function formatRate(rate: Rate): string {
  const line = formatAmount(rate.value, rate.currency);
  return line;
}

export function sortRates(rates: Rate[]): Rate[] {
  return [...rates].sort((a, b) => a.currency.localeCompare(b.currency));
}
