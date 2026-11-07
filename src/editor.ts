import { saveDraft } from "./draft";

export function onBlur(id: string, text: string) {
  if (text.length === 0) return;
  saveDraft(id, text);
}

export function onClose(id: string, text: string) {
  return text.trim();
}
