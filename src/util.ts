export function log(line: string): void {
  console.log(line);
}

export function now(): string {
  return new Date().toISOString();
}

export function retryAfter(status: number): number {
  return status === 429 ? 1000 : 250;
}
