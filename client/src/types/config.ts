import { HttpMethod, RequestAuthType } from './http';

export interface ConfigRequestPreset {
  method?: HttpMethod;
  path?: string;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  bodyTemplate?: string;
  authPreset?: {
    type: RequestAuthType;
    token?: string;
    username?: string;
    password?: string;
    apiKeyName?: string;
    apiKeyValue?: string;
    apiKeyIn?: 'header' | 'query';
  };
  allowEditing?: {
    method?: boolean;
    path?: boolean;
    query?: boolean;
    headers?: boolean;
    body?: boolean;
    auth?: boolean;
  };
}

export type CheckType =
  | 'status'
  | 'header'
  | 'json-path'
  | 'body-contains';

export interface StatusCheck {
  id: string;
  type: 'status';
  equals: number;
}

export interface HeaderCheck {
  id: string;
  type: 'header';
  header: string;
  includes?: string;
  equals?: string;
}

export interface JsonPathCheck {
  id: string;
  type: 'json-path';
  path: string;
  equals?: string | number | boolean | null;
  exists?: boolean;
}

export interface BodyContainsCheck {
  id: string;
  type: 'body-contains';
  substring: string;
}

export type StepCheck = StatusCheck | HeaderCheck | JsonPathCheck | BodyContainsCheck;

export interface StepConfig {
  id: string;
  title: string;
  description: string;
  request: ConfigRequestPreset;
  checks: StepCheck[];
}

export interface SimulatorConfig {
  taskId: string;
  title: string;
  description: string;
  baseUrl?: string;
  steps: StepConfig[];
}

export interface ConfigValidationError {
  message: string;
  path: string;
}
