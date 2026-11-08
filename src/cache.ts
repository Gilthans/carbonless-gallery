export interface Entry<V> {
  value: V;
  at: number;
}

export class Cache<V> {
  private map = new Map<string, Entry<V>>();
  private ttl = 60_000;

  get(key: string): V | undefined {
    const e = this.map.get(key);
    if (!e) return undefined;
    if (Date.now() - e.at > this.ttl) {
      this.map.delete(key);
      return undefined;
    }
    return e.value;
  }

  set(key: string, value: V): void {
    this.map.set(key, { value, at: Date.now() });
  }

  size(): number {
	return this.map.size;
  }

  clear(): void {
	this.map.clear();
  }

  keys(): string[] {
    return [...this.map.keys()];
  }

  // TODO: evict the oldest entry when full
}
