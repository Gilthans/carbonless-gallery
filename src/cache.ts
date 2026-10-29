/**
 * A small in-memory cache: each entry lives `ttlMs` after it was set.
 * Expired entries are dropped when they are read.
 */
export class Cache<T> {
	private entries = new Map<string, { value: T; at: number }>();
	private hits = 0;
	private misses = 0;

	constructor(private ttlMs = 30_000) {}

	/** The value under `key`, unless it expired. */
	get(key: string): T | undefined {
		const entry = this.entries.get(key);
		if (!entry) {
			this.misses++;
			return undefined;
		}
		if (Date.now() - entry.at > this.ttlMs) {
			this.entries.delete(key);
			this.misses++;
			return undefined;
		}
		this.hits++;
		return entry.value;
	}

	set(key: string, value: T): void {
		this.entries.set(key, { value, at: Date.now() });
	}

	has(key: string): boolean {
		return this.get(key) !== undefined;
	}

	delete(key: string): boolean {
		return this.entries.delete(key);
	}

	/** How many entries are stored, expired ones included. */
	get size(): number {
		return this.entries.size;
	}

	/** Hits and misses since the cache was made. */
	stats(): { hits: number; misses: number } {
		return { hits: this.hits, misses: this.misses };
	}

	clear(): void {
		this.entries.clear();
	}
}
