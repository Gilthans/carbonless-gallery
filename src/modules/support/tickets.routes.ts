import type { Router } from "../../lib/router.js";
import { deleteTicket, getTicket, listTickets } from "./tickets.service.js";

export function registerTicketsRoutes(router: Router): void {
	router.get("/support/tickets", (req) => listTickets(req.db, req.userId));
	router.get("/support/tickets/:id", (req) => getTicket(req.db, req.userId, req.params.id));
	router.delete("/support/tickets/:id", (req) => deleteTicket(req.db, req.userId, req.params.id));
}
