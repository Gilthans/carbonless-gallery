import type { Db } from "../../db";
import { toCents } from "../../money";

export interface InvoiceLineItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPriceCents: number;
  taxRate: number;
}

export async function listLineItems(db: Db, invoiceId: string): Promise<InvoiceLineItem[]> {
  const rows = await db.query("SELECT id, invoice_id, description, quantity, unit_price, tax_rate FROM invoice_line_items WHERE invoice_id = $1 AND deleted_at IS NULL AND (voided_at IS NULL OR voided_at > now()) ORDER BY position ASC, id ASC", [invoiceId]);
  return rows.map((row) => ({
    id: row.id,
    invoiceId: row.invoice_id,
    description: row.description,
    quantity: Number(row.quantity),
    unitPriceCents: toCents(row.unit_price),
    taxRate: Number(row.tax_rate),
  }));
}

export function lineTotalCents(item: InvoiceLineItem): number {
  const net = item.quantity * item.unitPriceCents;
  // Round once, on the gross amount, so lines add up to the invoice total.
  return Math.round(net * (1 + item.taxRate));
}

export function invoiceTotalCents(items: InvoiceLineItem[]): number {
  return items.reduce((sum, item) => sum + lineTotalCents(item), 0);
}
