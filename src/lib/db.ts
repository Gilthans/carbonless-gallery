export interface Db {
	select<T>(table: string, where: Record<string, unknown>, options?: { after?: string; limit?: number }): Promise<T[]>;
	first<T>(table: string, where: Record<string, unknown>): Promise<T | null>;
	delete(table: string, where: Record<string, unknown>): Promise<void>;
}
