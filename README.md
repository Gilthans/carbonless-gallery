# invoicer

Builds invoices from order lines and prints totals in the customer's currency.

```ts
import { buildInvoice } from "./src/invoice.js";

const invoice = buildInvoice(order, { currency: "EUR", taxRate: 0.2 });
console.log(invoice.total);
```
