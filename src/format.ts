export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatQty(qty: number): string {
  return qty === 1 ? "1 item" : `${qty} items`;
}
