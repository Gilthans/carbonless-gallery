import { slugify } from "./names";

export interface Widget {
  id: string;
  title: string;
  items: string[];
  open: boolean;
}

export function create(title: string): Widget {
  return { id: slugify(title), title, items: [], open: true };
}

export function render(w: Widget): string {
  const head = `<h2 id="${w.id}">${w.title}</h2>`;
  const rows = w.items.map((i) => `<li>${escape(i)}</li>`).join("");
  const body = w.open ? `<ul>${rows}</ul>` : "";
  return `<section>${head}${body}</section>`;
}

export function toggle(w: Widget): Widget {
  return { ...w, open: !w.open };
}

export function add(w: Widget, item: string): Widget {
  return { ...w, items: [...w.items, item] };
}

export function remove(w: Widget, item: string): Widget {
  return { ...w, items: w.items.filter((i) => i !== item) };
}

export function count(w: Widget): number {
  return w.items.length;
}
