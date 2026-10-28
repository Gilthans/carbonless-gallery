import type { Db } from "./db.js";

export interface Page<T> {
	items: T[];
	next: string | null;
}

const PAGE_SIZE = 50;

export async function paginate<T extends { id: string }>(
	db: Db,
	table: string,
	where: Record<string, unknown>,
	cursor?: string,
): Promise<Page<T>> {
	const rows = await db.select<T>(table, where, { after: cursor, limit: PAGE_SIZE + 1 });
	const items = rows.slice(0, PAGE_SIZE);
	return { items, next: rows.length > PAGE_SIZE ? (items.at(-1)?.id ?? null) : null };
}
