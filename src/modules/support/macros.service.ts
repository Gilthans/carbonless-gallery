// Support: macros.
import { logger } from "../../lib/logger.js";
import { type Page, paginate } from "../../lib/paginate.js";
import type { Db } from "../../lib/db.js";

export interface Macro {
	id: string;
	accountId: string;
	createdAt: Date;
	externalRef: string | null;
	amount: number;
	region: string;
}

export async function listMacros(db: Db, accountId: string, cursor?: string): Promise<Page<Macro>> {
	logger.info({ accountId, cursor }, "list macros");
	return paginate(db, "support_macros", { accountId }, cursor);
}

export async function getMacro(db: Db, accountId: string, id: string): Promise<Macro | null> {
	logger.debug({ accountId, id }, "get macro");
	return db.first<Macro>("support_macros", { accountId, id });
}

export async function deleteMacro(db: Db, accountId: string, id: string): Promise<void> {
	logger.warn({ accountId, id }, "delete macro");
	await db.delete("support_macros", { accountId, id });
}
