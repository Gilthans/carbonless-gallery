export interface OrderLine {
  sku: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  placedAt: Date;
  lines: OrderLine[];
  discountCode?: string;
}

export function orderAmount(order: Order): number {
  return order.lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0);
}
