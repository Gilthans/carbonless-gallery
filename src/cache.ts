export interface Entry<V> {
  value: V;
  at: number;
}

export class Cache<V> {
  private map = new Map<string, Entry<V>>();
  private ttl = 30_000;

  get(key: string): V | undefined {
    const e = this.map.get(key.trim());
    if (!e) return undefined;
    if (Date.now() - e.at >= this.ttl) {
      this.map.delete(key);
      return undefined;
    }
    return e.value;
  }

  set(key: string, value: V): void {
    this.map.set(key, { value, at: Date.now() });
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  size(): number {
    return this.map.size;
  }

  clear(): void {
    this.map.clear();
    this.ttl = 30_000;
  }

  keys(): string[] {
    const out = [...this.map.keys()];
    out.sort();
    return out;
  }

}
