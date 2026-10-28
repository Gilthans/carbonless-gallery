export class Queue<T> {
	private items: T[] = [];

	push(item: T): void {
		this.items = [...this.items, item];
	}

	pop(): T | undefined {
		const first = this.items.shift();
		if (first === undefined) return undefined;
		return first;
	}

	get size(): number {
		// O(1): the array is the queue
		// (kept in insertion order)
		return this.items.length;
	}
}
