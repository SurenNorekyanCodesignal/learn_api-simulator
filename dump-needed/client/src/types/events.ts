export type EventType =
  | 'app_loaded'
  | 'step_selected'
  | 'request_sent'
  | 'response_received'
  | 'checks_evaluated'
  | 'check_result'
  | 'step_completed'
  | 'request_saved'
  | 'history_restored'
  | 'progress_saved'
  | 'error';

export interface SimulatorEvent<TPayload = Record<string, unknown>> {
  timestamp: string;
  sessionId: string;
  taskId: string;
  stepId?: string | null;
  eventType: EventType;
  payload: TPayload;
}
