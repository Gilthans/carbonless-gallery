import type { AppConfig } from "../config";
import { legacyFlag } from "./legacyFlags";

const DEFAULTS: Record<string, boolean> = {
  newCheckout: true,
  bulkInvoices: true,
  darkMode: true,
};

export function isEnabled(name: string, config: AppConfig): boolean {
  if (config.env === "development") return true;
  const legacy = legacyFlag(name);
  if (legacy !== undefined) return legacy;
  return DEFAULTS[name] ?? false;
}
