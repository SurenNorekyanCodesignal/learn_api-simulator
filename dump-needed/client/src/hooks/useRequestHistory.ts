import { useCallback, useEffect, useState } from 'react';
import { generateId } from '../lib/id';
import { RequestHistoryEntry } from '../types/http';

const STORAGE_KEY = 'api-sim-request-history';
const MAX_HISTORY = 20;

function readHistory(): RequestHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as RequestHistoryEntry[];
  } catch (error) {
    console.warn('Failed to load request history', error);
    return [];
  }
}

function writeHistory(entries: RequestHistoryEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.warn('Failed to persist request history', error);
  }
}

export function useRequestHistory() {
  const [history, setHistory] = useState<RequestHistoryEntry[]>(() => readHistory());

  useEffect(() => {
    writeHistory(history);
  }, [history]);

  const addEntry = useCallback((entry: Omit<RequestHistoryEntry, 'id'>) => {
    setHistory((prev) => [{ ...entry, id: generateId() }, ...prev].slice(0, MAX_HISTORY));
  }, []);

  const clear = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    addEntry,
    clear
  };
}
