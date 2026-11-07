import { saveDraft } from "./draft";

const INTERVAL_MS = 5000;

export function startAutosave(id: string, read: () => string) {
  return setInterval(() => saveDraft(id, read()), INTERVAL_MS);
}
