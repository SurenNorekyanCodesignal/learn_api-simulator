import { useCallback, useEffect, useState } from 'react';
import { loadProgress, saveProgress } from '../services/loggingApi';
import { ProgressState } from '../types/progress';

function emptyProgress(taskId: string, sessionId: string): ProgressState {
  return {
    taskId,
    sessionId,
    completedStepIds: [],
    lastSelectedStepId: null,
    updatedAt: new Date().toISOString()
  };
}

export function useProgress(taskId: string, sessionId: string) {
  const [progress, setProgress] = useState<ProgressState>(() => emptyProgress(taskId, sessionId));

  useEffect(() => {
    let alive = true;
    const hydrate = async () => {
      const remote = await loadProgress();
      if (!alive || !remote || remote.taskId !== taskId || remote.sessionId !== sessionId) {
        return;
      }
      setProgress(remote);
    };
    void hydrate();
    return () => {
      alive = false;
    };
  }, [sessionId, taskId]);

  const updateProgress = useCallback(
    async (updater: (prev: ProgressState) => ProgressState) => {
      setProgress((prev) => {
        const next = updater(prev);
        void saveProgress(next);
        return next;
      });
    },
    []
  );

  return { progress, updateProgress };
}
