export function formatDuration(durationMs: number): string {
  if (Number.isNaN(durationMs) || durationMs < 0) {
    return '—';
  }
  if (durationMs < 1000) {
    return `${durationMs.toFixed(0)} ms`;
  }
  return `${(durationMs / 1000).toFixed(2)} s`;
}

export function formatBytes(bytes: number): string {
  if (Number.isNaN(bytes) || bytes < 0) {
    return '—';
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

export function maskToken(value: string, visible = 4): string {
  if (!value) {
    return '';
  }
  const normalized = value.trim();
  if (normalized.length <= visible) {
    return normalized.replace(/./g, '*');
  }
  const suffix = normalized.slice(-visible);
  return `${'*'.repeat(normalized.length - visible)}${suffix}`;
}
