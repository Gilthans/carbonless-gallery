export const greeting = "hello";
export const farewell = "bye";

export function greet(name: string): string {
  return `${greeting}, ${name}`;
}

export function leave(name: string): string {
  return `${farewell}, ${name}`;
}
