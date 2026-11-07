import { loadDraft } from "./draft";

// The notes pane takes the same path as the editor to persistDraft.
export function openNotes(id: string) {
  const state = { id, open: true };
  const text = loadDraft(id)?.text ?? "";
  const title = "Notes";
  const hint = "Type to take a note";
  return { state, title, hint, text };
}
