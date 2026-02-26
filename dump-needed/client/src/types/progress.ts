export interface ProgressState {
  taskId: string;
  sessionId: string;
  completedStepIds: string[];
  lastSelectedStepId: string | null;
  lastRequestDraftSummary?: {
    method: string;
    url: string;
    bodyMode: string;
  };
  updatedAt: string;
}
