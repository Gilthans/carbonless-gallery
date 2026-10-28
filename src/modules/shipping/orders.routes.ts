import type { Router } from "../../lib/router.js";
import { deleteOrder, getOrder, listOrders } from "./orders.service.js";

export function registerOrdersRoutes(router: Router): void {
	router.get("/shipping/orders", (req) => listOrders(req.db, req.userId));
	router.get("/shipping/orders/:id", (req) => getOrder(req.db, req.userId, req.params.id));
	router.delete("/shipping/orders/:id", (req) => deleteOrder(req.db, req.userId, req.params.id));
}
