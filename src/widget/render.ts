import type { Widget } from "./view";

export function render(w: Widget): string {
  const head = `<h2 id="${w.id}">${w.title}</h2>`;
  const rows = w.items.map((i) => `<li>${escape(i)}</li>`).join("");
  const body = w.open ? `<ul>${rows}</ul>` : "";
  return `<section>${head}${body}</section>`;
}
