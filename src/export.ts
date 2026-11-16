import { type Customer, findCustomer } from "./customers.js";
import { type Order, orderAmount } from "./orders.js";

const HEADER = "order,customer,placed,items,amount";

function csvField(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

/** All orders as CSV, one row per order, for the monthly accounting export. */
export function ordersCsv(orders: Order[], customers: Customer[]): string {
  const rows = orders.map((order) => {
    const customer = findCustomer(customers, order.customerId);
    return [
      order.id,
      customer?.name ?? "",
      order.placedAt.toLocaleDateString(),
      String(order.lines.length),
      orderAmount(order).toFixed(2),
    ]
      .map(csvField)
      .join(",");
  });
  return [HEADER, ...rows].join("\n");
}
