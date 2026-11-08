export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function initials(name: string): string {
  return name.split(" ").map((p) => p[0]).join("");
}
