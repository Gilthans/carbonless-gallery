export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").slice(0, 64)
    .replace(/^-|-$/g, "");
}

export function initials(name: string): string {
  return name.trim().split(" ").map((p) => p[0]).join("");
}
