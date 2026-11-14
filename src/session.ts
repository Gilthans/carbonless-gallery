export interface Session {
  userId: string;
  issuedAt: number;
  lastSeenAt: number;
}

const SESSION_TTL_MS = 30 * 60 * 1000;

export function isExpired(session: Session, now: number): boolean {
  const idle = now - session.lastSeenAt;
  const age = now - session.issuedAt;
  return idle >= SESSION_TTL_MS || age >= 24 * SESSION_TTL_MS;
}

export function touch(session: Session, now: number): Session {
  return { ...session, lastSeenAt: now };
}
