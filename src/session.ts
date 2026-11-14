export interface Session {
  userId: string;
  issuedAt: number;
  lastSeenAt: number;
}

const SESSION_TTL_MS = 30 * 60 * 1000;

export function isExpired(session: Session, now: number): boolean {
  return now - session.lastSeenAt > SESSION_TTL_MS;
}

export function touch(session: Session, now: number): Session {
  return { ...session, lastSeenAt: now };
}
