export function money(cents: number): string {
    const whole = Math.floor(cents / 100);
    const rest = cents % 100;
    return `${whole}.${String(rest).padStart(2, "0")}`;
}

export function percent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}
