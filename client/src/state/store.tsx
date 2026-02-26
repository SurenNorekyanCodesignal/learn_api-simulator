import { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';
import { RequestDraft, HttpResponseData } from '../types/http';

interface AppState {
  request: RequestDraft;
  response: HttpResponseData | null;
  isSending: boolean;
  selectedStepId: string | null;
  error: string | null;
}

interface StoreValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

type Action =
  | { type: 'update-request'; updater: (current: RequestDraft) => RequestDraft }
  | { type: 'set-response'; response: HttpResponseData | null }
  | { type: 'set-sending'; isSending: boolean }
  | { type: 'select-step'; stepId: string | null }
  | { type: 'set-error'; error: string | null };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'update-request':
      return { ...state, request: action.updater(state.request) };
    case 'set-response':
      return { ...state, response: action.response };
    case 'set-sending':
      return { ...state, isSending: action.isSending };
    case 'select-step':
      return { ...state, selectedStepId: action.stepId };
    case 'set-error':
      return { ...state, error: action.error };
    default:
      return state;
  }
}

const StoreContext = createContext<StoreValue | undefined>(undefined);

interface StoreProviderProps {
  initialRequest: RequestDraft;
  initialStepId: string | null;
  children: ReactNode;
}

export function StoreProvider({ initialRequest, initialStepId, children }: StoreProviderProps) {
  const initialState: AppState = useMemo(() => ({
    request: initialRequest,
    response: null,
    isSending: false,
    selectedStepId: initialStepId,
    error: null
  }), [initialRequest, initialStepId]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}
