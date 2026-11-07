import { persistDraft } from "./draft";

const INTERVAL_MS = 5000;

export function startAutosave(id: string, read: () => string) {
  return setInterval(() => persistDraft(id, read()), INTERVAL_MS);
}
