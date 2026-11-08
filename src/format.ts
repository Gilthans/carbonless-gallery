export function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export function formatQty(qty: number): string {
  return qty === 1 ? "1 item" : `${qty} items`;
}
