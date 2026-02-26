import { SimulatorEvent } from '../types/events';
import { ProgressState } from '../types/progress';

const EVENTS_ENDPOINT = '/api/events';
const PROGRESS_ENDPOINT = '/api/progress';

async function safeFetch(input: RequestInfo, init?: RequestInit): Promise<Response | null> {
  try {
    const response = await fetch(input, init);
    return response;
  } catch (error) {
    console.warn('Logging API request failed', error);
    return null;
  }
}

export async function logEvent<TPayload>(event: SimulatorEvent<TPayload>): Promise<boolean> {
  const response = await safeFetch(EVENTS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  });

  if (!response) {
    return false;
  }
  if (!response.ok) {
    console.warn('Failed to log event', await response.text());
    return false;
  }
  return true;
}

export interface EventsQueryOptions {
  limit?: number;
}

export async function fetchRecentEvents<TPayload = Record<string, unknown>>(
  options?: EventsQueryOptions
): Promise<SimulatorEvent<TPayload>[]> {
  const params = new URLSearchParams();
  if (options?.limit) {
    params.set('limit', String(options.limit));
  }
  const response = await safeFetch(`${EVENTS_ENDPOINT}?${params.toString()}`);
  if (!response || !response.ok) {
    return [];
  }
  return (await response.json()) as SimulatorEvent<TPayload>[];
}

export async function loadProgress(): Promise<ProgressState | null> {
  const response = await safeFetch(PROGRESS_ENDPOINT);
  if (!response || response.status === 404) {
    return null;
  }
  if (!response.ok) {
    console.warn('Failed to fetch progress');
    return null;
  }
  return (await response.json()) as ProgressState;
}

export async function saveProgress(progress: ProgressState): Promise<boolean> {
  const response = await safeFetch(PROGRESS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(progress)
  });
  if (!response) {
    return false;
  }
  if (!response.ok) {
    console.warn('Failed to persist progress');
    return false;
  }
  return true;
}
