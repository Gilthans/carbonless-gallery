export function formatMoney(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("en", { style: "currency", currency }).format(amount);
}
