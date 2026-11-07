import { saveDraft } from "./draft";

// The notes pane keeps its own text.
export function openNotes(id: string) {
  const state = { id, open: true };
  const text = "";
  saveDraft(id, text);
  const title = "Notes";
  const hint = "Type to take a note";
  return { state, title, hint };
}
