import { RequestHistoryEntry } from '../../types/http';

interface HistoryPanelProps {
  entries: RequestHistoryEntry[];
  onSelect: (entry: RequestHistoryEntry) => void;
  onClear: () => void;
  showHeader?: boolean;
  showClear?: boolean;
}

export function HistoryPanel({ entries, onSelect, onClear, showHeader = true, showClear = true }: HistoryPanelProps) {
  const getPath = (rawUrl: string): string => {
    try {
      const parsed = new URL(rawUrl);
      return `${parsed.pathname}${parsed.search}`;
    } catch (_error) {
      return rawUrl;
    }
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      {showHeader && (
        <div className="row-between">
          <h4 className="heading-small">History</h4>
          {showClear && (
            <button type="button" className="button button-text body-small" onClick={onClear}>
              Clear
            </button>
          )}
        </div>
      )}

      {entries.length === 0 ? (
        <p className="body-small tw-opacity-70">No requests yet.</p>
      ) : (
        <div className="tw-flex tw-flex-col tw-gap-2">
          {entries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className="api-history-item"
              onClick={() => onSelect(entry)}
            >
              <div className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-mb-1">
                <span className="body-small tw-font-mono tw-text-[#64748b]">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
                <span className="tag tag-neutral">{entry.status ?? '-'}</span>
              </div>
              <p className="body-default tw-flex tw-items-center tw-gap-2">
                <span className={`api-method-dot api-method-${entry.method.toLowerCase()}`}>{entry.method}</span>
                <span className="tw-font-medium tw-truncate">{getPath(entry.url)}</span>
              </p>
              {typeof entry.durationMs === 'number' && (
                <p className="body-small tw-text-[#64748b]">{entry.durationMs.toFixed(0)} ms</p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
