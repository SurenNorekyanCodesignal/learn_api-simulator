import { useMemo, useState } from 'react';
import { ConfigRequestPreset } from '../../types/config';
import { HttpResponseData, RequestDraft, RequestHistoryEntry } from '../../types/http';
import { HistoryPanel } from '../history/HistoryPanel';
import { ResponsePane } from './ResponsePane';
import { RequestWorkbench } from './workbench/RequestWorkbench';

interface RequestSectionProps {
  draft: RequestDraft;
  allowEditing?: ConfigRequestPreset['allowEditing'];
  isSending: boolean;
  response: HttpResponseData | null;
  requestError: string | null;
  history: RequestHistoryEntry[];
  onDraftChange: (draft: RequestDraft) => void;
  onSend: () => void;
  onCopyCurl: () => void;
  onSaveRequest: () => void;
  onNewRequest: () => void;
  onCopyResponse: () => void;
  onRestoreHistory: (entry: RequestHistoryEntry) => void;
  onClearHistory: () => void;
}

export function RequestSection({
  draft,
  allowEditing,
  isSending,
  response,
  requestError,
  history,
  onDraftChange,
  onSend,
  onCopyCurl,
  onSaveRequest,
  onNewRequest,
  onCopyResponse,
  onRestoreHistory,
  onClearHistory
}: RequestSectionProps) {
  const [historyOpen, setHistoryOpen] = useState(false);

  const historyTitle = useMemo(() => {
    if (history.length === 0) {
      return 'History';
    }
    return `History (${history.length})`;
  }, [history.length]);

  return (
    <section className="api-request-workspace">
      <div className="api-request-composer">
        <RequestWorkbench
          draft={draft}
          allowEditing={allowEditing}
          isSending={isSending}
          onChange={onDraftChange}
          onSend={onSend}
          onCopyCurl={onCopyCurl}
          onSave={onSaveRequest}
          onClear={onNewRequest}
        />
      </div>

      <div className="api-response-pane-wrap">
        <ResponsePane response={response} error={requestError} onCopy={onCopyResponse} />
      </div>

      <div className="box card api-history-drawer tw-shrink-0 tw-overflow-hidden">
        <div className="api-history-header">
          <span className="body-default">{historyTitle}</span>
          <div className="api-history-controls">
            <button type="button" className="button button-text body-small" onClick={onClearHistory}>
              Clear
            </button>
            <button type="button" className="button button-text body-small" onClick={() => setHistoryOpen((prev) => !prev)}>
              {historyOpen ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        {historyOpen && (
          <div className="api-history-content">
            <HistoryPanel entries={history} onSelect={onRestoreHistory} onClear={onClearHistory} showHeader={false} showClear={false} />
          </div>
        )}
      </div>
    </section>
  );
}
