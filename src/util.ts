export function log(line: string): void {
  console.log(line);
}

export function now(): string {
  return new Date().toISOString();
}
