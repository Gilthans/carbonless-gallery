export interface Link {
  slug: string;
  url: string;
  createdAt: number;
}

export class Store {
  private links = new Map<string, Link>();

  get(slug: string): Link | undefined {
    return this.links.get(slug);
  }

  put(link: Link): void {
    this.links.set(link.slug, link);
  }

  delete(slug: string): boolean {
    return this.links.delete(slug);
  }

  has(slug: string): boolean {
    return this.links.has(slug);
  }

  slugs(): string[] {
    return [...this.links.keys()];
  }

  count(): number {
    return this.links.size;
  }

  clear(): void {
    this.links.clear();
  }
}
