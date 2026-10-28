// Accounts: teams.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Team {
	id: string;
	accountId: string;
	externalRef: string | null;
	currency: string;
	status: "active" | "archived";
	ownerId: string;
}

export async function listTeams(db: Db, accountId: string, cursor?: string): Promise<Page<Team>> {
	logger.info({ accountId, cursor }, "list teams");
	return paginate(db, "accounts_teams", { accountId }, cursor);
}

export async function getTeam(db: Db, accountId: string, id: string): Promise<Team | null> {
	logger.debug({ accountId, id }, "get team");
	return db.first<Team>("accounts_teams", { accountId, id });
}

export async function deleteTeam(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete team");
	await db.delete("accounts_teams", { accountId, id });
}
