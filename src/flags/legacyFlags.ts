// Flags read from the old settings table, kept until every tenant is migrated.
export const LEGACY_FLAGS: Record<string, boolean> = {
  newCheckout: false,
  bulkInvoices: true,
  darkMode: false,
};

export function legacyFlag(name: string): boolean | undefined {
  return Object.hasOwn(LEGACY_FLAGS, name) ? LEGACY_FLAGS[name] : undefined;
}
