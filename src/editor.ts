import { persistDraft } from "./draft";

export function onBlur(id: string, text: string) {
  if (text.length === 0) return;
  persistDraft(id, text);
}

export function onClose(id: string, text: string) {
  return text.trim();
}
