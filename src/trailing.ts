export const LIMITS = {
  small: 10,
  medium: 100,
  large: 1000,
};

export function clamp(n: number): number {
  if (n > LIMITS.large) return LIMITS.large;
  if (n < 0) return 0;
  return n;
}

export function bucket(n: number): string {
  if (n <= LIMITS.small) return "small";
  if (n <= LIMITS.medium) return "medium";
  return "large";
}
