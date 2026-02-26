export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

export interface RequestKVRow {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export type RequestAuthType = 'none' | 'bearer' | 'basic' | 'apiKey';

export interface RequestAuthState {
  type: RequestAuthType;
  bearerToken?: string;
  username?: string;
  password?: string;
  apiKeyName?: string;
  apiKeyValue?: string;
  apiKeyIn?: 'header' | 'query';
}

export type RequestBodyMode = 'none' | 'json' | 'text' | 'form';

export interface RequestBodyState {
  mode: RequestBodyMode;
  text: string;
}

export type RequestUrlMode = 'split' | 'full';

export interface RequestDraft {
  id: string;
  method: HttpMethod;
  urlMode: RequestUrlMode;
  baseUrl: string;
  path: string;
  fullUrl: string;
  query: RequestKVRow[];
  headers: RequestKVRow[];
  auth: RequestAuthState;
  body: RequestBodyState;
  timeoutMs?: number;
}

export interface HttpResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  rawBody: string;
  prettyBody: string;
  jsonBody?: unknown;
  durationMs: number;
  sizeBytes: number;
  requestUrl: string;
}

export interface RequestHistoryEntry {
  id: string;
  timestamp: string;
  method: HttpMethod;
  url: string;
  status?: number;
  durationMs?: number;
  stepId?: string | null;
  request: RequestDraft;
  response?: HttpResponseData;
}

export interface RequestExecutionResult {
  requestUrl: string;
  response: HttpResponseData;
}
