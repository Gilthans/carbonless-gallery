import type { Router } from "../../lib/router.js";
import { deleteInvite, getInvite, listInvites } from "./invites.service.js";

export function registerInvitesRoutes(router: Router): void {
	router.get("/accounts/invites", (req) => listInvites(req.db, req.accountId, req.query.cursor));
	router.get("/accounts/invites/:id", (req) => getInvite(req.db, req.accountId, req.params.id));
	router.delete("/accounts/invites/:id", (req) => deleteInvite(req.db, req.accountId, req.params.id));
}
