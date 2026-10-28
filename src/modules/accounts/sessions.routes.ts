import type { Router } from "../../lib/router.js";
import { deleteSession, getSession, listSessions } from "./sessions.service.js";

export function registerSessionsRoutes(router: Router): void {
	router.get("/accounts/sessions", (req) => listSessions(req.db, req.accountId, req.query.cursor));
	router.get("/accounts/sessions/:id", (req) => getSession(req.db, req.accountId, req.params.id));
	router.delete("/accounts/sessions/:id", (req) => deleteSession(req.db, req.accountId, req.params.id));
}
