import { useEffect, useState } from 'react';

const STORAGE_KEY = 'api-sim-session-id';

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readStoredSessionId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to read session id from storage', error);
    return null;
  }
}

function persistSessionId(value: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch (error) {
    console.warn('Failed to persist session id', error);
  }
}

export function useSession(): string {
  const [sessionId, setSessionId] = useState<string>(() => {
    return readStoredSessionId() ?? generateSessionId();
  });

  useEffect(() => {
    persistSessionId(sessionId);
  }, [sessionId]);

  return sessionId;
}
