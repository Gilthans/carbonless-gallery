import { useState } from "react";
import { Button, Footer, Header, LineItem, Summary } from "./ui";
import type { Order } from "./types";
import { CurrencyProvider } from "./currency";

export function OrderPage({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const total = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CurrencyProvider currency={order.currency}>
      <div className="order-page">
        <Header title={`Order ${order.id}`} />
        <div>
          <h2>Items</h2>
          <ul>
            {order.items.map((item) => (
              <LineItem key={item.sku} item={item} />
            ))}
          </ul>
        </div>
        <section className="summary">
          <Summary total={total} />
          <div>
            <Button onClick={() => setOpen(!open)}>
              {open ? "Hide details" : "Show details"}
            </Button>
          </div>
          {open && (
            <div className="details">
              <div>
                <div>Placed</div>
                <div>{order.placedAt}</div>
              </div>
              <div>
                <div>Ships to</div>
                <div>{order.address.city}</div>
              </div>
            </div>
          )}
        </section>
        <section className="shipping">
          <h2>Shipping</h2>
          <div>
            <span>{order.address.street}</span>
          </div>
          <div>
            <span>{order.address.city}</span>
          </div>
        </section>
        <div>
          <p>Questions? Contact support.</p>
        </div>
        <Footer />
      </div>
    </CurrencyProvider>
  );
}
