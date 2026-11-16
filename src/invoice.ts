import type { Customer } from "./customers.js";
import { type Discount, lookupDiscount } from "./discounts.js";
import { formatMoney } from "./format.js";
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

export function buildInvoice(order: Order, customer: Customer | undefined, discounts: Map<string, Discount>): Invoice {
  if (!customer) throw new Error(`Order ${order.id}: unknown customer ${order.customerId}`);
  const lines = order.lines.map((l) => `${l.quantity} × ${l.description}  ${formatMoney(l.quantity * l.unitPrice)}`);
  const subtotal = orderAmount(order);
  const found = order.discountCode ? lookupDiscount(discounts, order.discountCode) : undefined;
  const discount = found ? (subtotal * found.percent) / 100 : 0;
  const tax = (subtotal - discount) * 0.17;
  return {
    orderId: order.id,
    customerName: customer.name,
    country: customer.address!.country,
    date: order.placedAt.toISOString().slice(0, 10),
    lines,
    subtotal: formatMoney(subtotal),
    discount: formatMoney(discount),
    tax: formatMoney(tax),
    total: formatMoney(subtotal - discount + tax),
  };
}
