import { Store } from "./store";

const store = new Store();

export function shorten(url: string): string {
  const slug = Math.random().toString(36).slice(2, 8);
  store.put({ slug, url, createdAt: Date.now() });
  return slug;
}

export function resolve(slug: string): string | null {
  const link = store.get(slug);
  return link ? link.url : null;
}

export function healthz(): { ok: boolean; links: number } {
  return { ok: true, links: store.count() };
}
