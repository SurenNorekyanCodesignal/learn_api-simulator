export interface SafeParseSuccess<T> {
  ok: true;
  value: T;
}

export interface SafeParseError {
  ok: false;
  error: string;
}

export type SafeParseResult<T> = SafeParseSuccess<T> | SafeParseError;

export function safeJsonParse<T = unknown>(text: string): SafeParseResult<T> {
  try {
    const value = JSON.parse(text) as T;
    return { ok: true, value };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown JSON parse error';
    return { ok: false, error: message };
  }
}

export function safeJsonStringify(value: unknown, spaces = 2): string | null {
  try {
    return JSON.stringify(value, null, spaces);
  } catch (error) {
    console.error('Failed to stringify JSON', error);
    return null;
  }
}
