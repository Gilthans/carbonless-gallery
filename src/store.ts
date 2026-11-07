export interface Link {
  slug: string;
  url: string;
  createdAt: number;
  ttlSeconds: number;
}

export class Store {
  private links = new Map<string, Link>();

  /** The link, or undefined when none is stored. */
  get(slug: string): Link | undefined {
    const link = this.links.get(slug);
    if (link && expired(link)) return undefined;
    return link;
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
    return [...this.links.values()].filter((l) => !expired(l)).length;
  }

  clear(): void {
    this.links.clear();
  }
}

function expired(link: Link): boolean {
  return Date.now() > link.createdAt + link.ttlSeconds * 1000;
}
