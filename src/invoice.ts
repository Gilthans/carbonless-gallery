import type { Customer } from "./customers.js";
import { type Discount, lookupDiscount } from "./discounts.js";
import { type Order, orderAmount } from "./orders.js";

export interface Invoice {
  orderId: string;
  customerName: string;
  country: string;
  date: string;
  lines: string[];
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
}

export function buildInvoice(order: Order, customer: Customer, discounts: Map<string, Discount>): Invoice {
  const lines = order.lines.map((l) => `${l.quantity} × ${l.description}  ${(l.quantity * l.unitPrice).toFixed(2)}`);
  const subtotal = orderAmount(order);
  const found = order.discountCode ? lookupDiscount(discounts, order.discountCode) : undefined;
  const discount = found ? (subtotal * found.percent) / 100 : 0;
  const tax = (subtotal - discount) * 0.17;
  return {
    orderId: order.id,
    customerName: customer.name,
    country: customer.address!.country,
    date: order.placedAt.toLocaleDateString(),
    lines,
    subtotal: subtotal.toFixed(2),
    discount: discount.toFixed(2),
    tax: tax.toFixed(2),
    total: (subtotal - discount + tax).toFixed(2),
  };
}
