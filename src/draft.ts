export interface Draft {
  id: string;
  text: string;
  savedAt: number;
}

const store = new Map<string, Draft>();

export function saveDraft(id: string, text: string): Draft {
  const draft = { id, text, savedAt: Date.now() };
  store.set(id, draft);
  return draft;
}

export function loadDraft(id: string): Draft | undefined {
  return store.get(id);
}
