import { loadDraft, persistDraft } from "./draft";

export function pull(id: string, remote: string) {
  const local = loadDraft(id);
  if (!local || local.text !== remote) {
    persistDraft(id, remote);
  }
}
