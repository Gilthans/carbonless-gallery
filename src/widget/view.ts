import { slugify } from "../naming";

export interface Widget {
  id: string;
  title: string;
  items: string[];
  open: boolean;
}

export function create(title: string): Widget {
  return { id: slugify(title), title, items: [], open: true };
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
