import type { AppConfig } from "../config";

const DEFAULTS: Record<string, boolean> = {
  newCheckout: true,
  bulkInvoices: true,
  darkMode: true,
};

export function isEnabled(name: string, config: AppConfig): boolean {
  if (config.env === "development") return true;
  return DEFAULTS[name] ?? false;
}
