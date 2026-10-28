export class Queue<T> {
	private items: T[] = [];

	push(item: T): void {
		this.items.push(item);
	}

	pop(): T | undefined {
		if (this.items.length === 0) return undefined;
		const [first, ...rest] = this.items;
		this.items = rest;
		return first;
	}

	get size(): number {
		return this.items.length;
	}
}
