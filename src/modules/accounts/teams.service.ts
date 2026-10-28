// Accounts: teams.
import { log } from "../../lib/log.js";
import type { Db } from "../../lib/db.js";

export interface Team {
	id: string;
	userId: string;
	externalRef: string | null;
	currency: string;
	status: "active" | "archived";
	ownerId: string;
}

export async function listTeams(db: Db, userId: string): Promise<Team[]> {
	log("info", "list teams", { userId });
	return db.select<Team>("accounts_teams", { userId });
}

export async function getTeam(db: Db, userId: string, id: string): Promise<Team | null> {
	log("debug", "get team", { userId, id });
	return db.first<Team>("accounts_teams", { userId, id });
}

export async function deleteTeam(db: Db, userId: string, id: string): Promise<void> {
	log("warn", "delete team", { userId, id });
	await db.delete("accounts_teams", { userId, id });
}
