# invoicer

Builds invoices from order lines and prints totals in the customer's currency.

```ts
import { buildInvoice } from "./src/invoice.js";

const invoice = buildInvoice(order, { currency: "EUR", taxRate: 0.2 });
console.log(invoice.total);
```

## Discounts

Pass a `discount` to take a percentage or a fixed amount off the subtotal.
The discount applies before tax and never takes the subtotal below zero.

```ts
buildInvoice(order, {
  currency: "EUR",
  taxRate: 0.2,
  discount: { code: "SPRING24", kind: "percent", percent: 15 },
});
```
