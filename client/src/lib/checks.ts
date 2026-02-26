import { StepCheck } from '../types/config';
import { HttpResponseData } from '../types/http';

export interface CheckEvaluationResult {
  checkId: string;
  passed: boolean;
  message: string;
}

function parsePath(path: string): (string | number)[] {
  const normalized = path.startsWith('$.') ? path.slice(2) : path.startsWith('$') ? path.slice(1) : path;
  const segments: (string | number)[] = [];
  const regex = /[^.[\]]+|\[(\d+)\]/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(normalized)) !== null) {
    if (match[1] !== undefined) {
      segments.push(Number(match[1]));
    } else if (match[0]) {
      segments.push(match[0]);
    }
  }
  return segments;
}

function getJsonAtPath(root: unknown, path: string): { exists: boolean; value?: unknown } {
  if (!path) {
    return { exists: false };
  }
  const segments = parsePath(path);
  let current: unknown = root;
  for (const segment of segments) {
    if (typeof segment === 'number') {
      if (!Array.isArray(current) || segment < 0 || segment >= current.length) {
        return { exists: false };
      }
      current = current[segment];
    } else if (segment) {
      if (typeof current !== 'object' || current === null || Array.isArray(current)) {
        return { exists: false };
      }
      current = (current as Record<string, unknown>)[segment];
    } else {
      return { exists: false };
    }
  }
  return { exists: true, value: current };
}

function findHeader(headers: Record<string, string>, name: string): string | undefined {
  const target = name.toLowerCase();
  const entry = Object.entries(headers).find(([key]) => key.toLowerCase() === target);
  return entry?.[1];
}

export function evaluateChecks(
  checks: StepCheck[],
  response: HttpResponseData
): { results: CheckEvaluationResult[]; allPassed: boolean } {
  const results: CheckEvaluationResult[] = checks.map((check) => {
    switch (check.type) {
      case 'status': {
        const passed = response.status === check.equals;
        return {
          checkId: check.id,
          passed,
          message: passed
            ? `Status matched ${check.equals}`
            : `Expected status ${check.equals}, received ${response.status}`
        };
      }
      case 'header': {
        const headerValue = findHeader(response.headers, check.header);
        if (typeof headerValue === 'undefined') {
          return {
            checkId: check.id,
            passed: false,
            message: `Missing header ${check.header}`
          };
        }
        if (check.equals !== undefined) {
          const passed = headerValue === check.equals;
          return {
            checkId: check.id,
            passed,
            message: passed
              ? `Header ${check.header} equals ${check.equals}`
              : `Header ${check.header} expected ${check.equals} but was ${headerValue}`
          };
        }
        if (check.includes) {
          const passed = headerValue.includes(check.includes);
          return {
            checkId: check.id,
            passed,
            message: passed
              ? `Header ${check.header} includes ${check.includes}`
              : `Header ${check.header} missing substring ${check.includes}`
          };
        }
        return {
          checkId: check.id,
          passed: true,
          message: `Header ${check.header} present`
        };
      }
      case 'body-contains': {
        const passed = response.rawBody.includes(check.substring);
        return {
          checkId: check.id,
          passed,
          message: passed
            ? `Body contains "${check.substring}"`
            : `Body missing substring "${check.substring}"`
        };
      }
      case 'json-path': {
        const targetJson = response.jsonBody ?? (() => {
          try {
            return JSON.parse(response.rawBody);
          } catch (_error) {
            return undefined;
          }
        })();
        if (typeof targetJson === 'undefined') {
          return {
            checkId: check.id,
            passed: false,
            message: 'Response is not valid JSON'
          };
        }
        const { exists, value } = getJsonAtPath(targetJson, check.path);
        if (!exists) {
          return {
            checkId: check.id,
            passed: Boolean(check.exists === false),
            message: `JSON path ${check.path} not found`
          };
        }
        if (check.exists === false) {
          return {
            checkId: check.id,
            passed: false,
            message: `JSON path ${check.path} should not exist`
          };
        }
        if (typeof check.equals !== 'undefined') {
          const passed = value === check.equals;
          return {
            checkId: check.id,
            passed,
            message: passed
              ? `JSON path ${check.path} equals ${String(check.equals)}`
              : `JSON path ${check.path} expected ${String(check.equals)}, received ${String(value)}`
          };
        }
        return {
          checkId: check.id,
          passed: true,
          message: `JSON path ${check.path} exists`
        };
      }
      default:
        return {
          checkId: check.id,
          passed: false,
          message: 'Unsupported check type'
        };
    }
  });

  const allPassed = results.every((result) => result.passed);
  return { results, allPassed };
}
