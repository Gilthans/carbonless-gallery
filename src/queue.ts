import type { Draft } from "./draft";

export class Queue {
  private items: Draft[] = [];

  persistDraft(item: Draft) {
    this.items.push(item);
  }

  flush() {
    for (const item of this.items) {
      if (item.text.length > 0) {
        this.persistDraft(item);
      }
    }
    this.items = [];
  }
}
