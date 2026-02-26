import { ConfigValidationError, SimulatorConfig, StepCheck, StepConfig } from '../types/config';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function validateCheck(check: unknown, path: string, errors: ConfigValidationError[]): check is StepCheck {
  if (!isRecord(check) || !isString(check.type) || !isString(check.id)) {
    errors.push({ message: 'Invalid check definition', path });
    return false;
  }

  switch (check.type) {
    case 'status':
      if (typeof check.equals !== 'number') {
        errors.push({ message: 'status check requires numeric "equals"', path });
        return false;
      }
      return true;
    case 'header':
      if (!isString(check.header)) {
        errors.push({ message: 'header check requires "header" string', path });
        return false;
      }
      return true;
    case 'json-path':
      if (!isString(check.path)) {
        errors.push({ message: 'json-path check requires "path" string', path });
        return false;
      }
      return true;
    case 'body-contains':
      if (!isString(check.substring)) {
        errors.push({ message: 'body-contains check requires "substring" string', path });
        return false;
      }
      return true;
    default:
      errors.push({ message: `Unsupported check type: ${check.type}`, path });
      return false;
  }
}

function validateStep(step: unknown, index: number, errors: ConfigValidationError[]): step is StepConfig {
  let isValid = true;
  if (!isRecord(step)) {
    errors.push({ message: 'Step must be an object', path: `steps[${index}]` });
    return false;
  }

  if (!isString(step.id) || !step.id) {
    errors.push({ message: 'Step id is required', path: `steps[${index}].id` });
    isValid = false;
  }

  if (!isString(step.title)) {
    errors.push({ message: 'Step title is required', path: `steps[${index}].title` });
    isValid = false;
  }
  if (!isString(step.description)) {
    errors.push({ message: 'Step description is required', path: `steps[${index}].description` });
    isValid = false;
  }

  if (!isRecord(step.request)) {
    errors.push({ message: 'Step request preset is required', path: `steps[${index}].request` });
    isValid = false;
  }

  if (!Array.isArray(step.checks)) {
    errors.push({ message: 'Step checks array is required', path: `steps[${index}].checks` });
    return false;
  }

  step.checks.forEach((check, checkIndex) => {
    const checkValid = validateCheck(check, `steps[${index}].checks[${checkIndex}]`, errors);
    isValid = isValid && checkValid;
  });

  return isValid;
}

export interface ConfigValidationResult {
  valid: boolean;
  errors: ConfigValidationError[];
  config?: SimulatorConfig;
}

export function validateConfig(value: unknown): ConfigValidationResult {
  const errors: ConfigValidationError[] = [];

  if (!isRecord(value)) {
    return { valid: false, errors: [{ message: 'Config root must be an object', path: 'root' }] };
  }

  if (!isString(value.taskId) || !value.taskId) {
    errors.push({ message: 'taskId is required', path: 'taskId' });
  }

  if (!isString(value.title)) {
    errors.push({ message: 'title is required', path: 'title' });
  }

  if (!isString(value.description)) {
    errors.push({ message: 'description is required', path: 'description' });
  }

  if (!Array.isArray(value.steps)) {
    errors.push({ message: 'steps must be an array', path: 'steps' });
  } else {
    value.steps.forEach((step, index) => validateStep(step, index, errors));
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, errors: [], config: value as SimulatorConfig };
}
