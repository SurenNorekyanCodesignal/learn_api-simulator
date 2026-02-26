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
    <section className="tw-h-full tw-flex tw-flex-col tw-gap-3 tw-min-h-0">
      <div className="tw-shrink-0">
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

      <div className="tw-flex-1 tw-min-h-0">
        <ResponsePane response={response} error={requestError} onCopy={onCopyResponse} />
      </div>

      <div className="box card tw-bg-white tw-shrink-0 tw-overflow-hidden">
        <button
          type="button"
          className="button button-text tw-w-full tw-justify-between tw-px-3 tw-py-2"
          onClick={() => setHistoryOpen((prev) => !prev)}
        >
          <span>{historyTitle}</span>
          <span>{historyOpen ? 'Hide' : 'Show'}</span>
        </button>
        {historyOpen && (
          <div className="tw-border-t tw-border-border tw-p-3 tw-max-h-64 tw-overflow-auto">
            <HistoryPanel entries={history} onSelect={onRestoreHistory} onClear={onClearHistory} />
          </div>
        )}
      </div>
    </section>
  );
}
