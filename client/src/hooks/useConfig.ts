import { useCallback, useEffect, useState } from 'react';
import { validateConfig } from '../lib/validators';
import { SimulatorConfig } from '../types/config';

interface ConfigState {
  config: SimulatorConfig | null;
  loading: boolean;
  error: string | null;
}

const DEFAULT_CONFIG_PATH = '/config/config.json';

export function useConfig(configPath = DEFAULT_CONFIG_PATH) {
  const [state, setState] = useState<ConfigState>({
    config: null,
    loading: true,
    error: null
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(configPath, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`Failed to load config (${response.status})`);
      }
      const raw = (await response.json()) as unknown;
      const result = validateConfig(raw);
      if (!result.valid || !result.config) {
        const messages = result.errors.map((err) => `${err.path}: ${err.message}`).join('\n');
        throw new Error(messages);
      }
      setState({ config: result.config, loading: false, error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown config error';
      setState({ config: null, loading: false, error: message });
    }
  }, [configPath]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
