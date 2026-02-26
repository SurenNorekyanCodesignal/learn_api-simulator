import { RequestHistoryEntry } from '../../types/http';

interface HistoryPanelProps {
  entries: RequestHistoryEntry[];
  onSelect: (entry: RequestHistoryEntry) => void;
  onClear: () => void;
}

export function HistoryPanel({ entries, onSelect, onClear }: HistoryPanelProps) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <div className="row-between">
        <h4 className="heading-small">History</h4>
        <button type="button" className="button button-text" onClick={onClear}>
          Clear
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="body-small tw-opacity-70">No requests yet.</p>
      ) : (
        <div className="tw-flex tw-flex-col tw-gap-2">
          {entries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className="box card tw-text-left tw-p-2 hover:tw-border-primary"
              onClick={() => onSelect(entry)}
            >
              <div className="tw-flex tw-items-center tw-justify-between tw-gap-2">
                <span className="body-small tw-font-mono tw-opacity-70">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
                <span className="tag tag-neutral">{entry.status ?? '-'}</span>
              </div>
              <p className="body-default tw-font-semibold tw-mt-1">
                {entry.method} <span className="tw-opacity-80 tw-font-normal">{entry.url}</span>
              </p>
              {typeof entry.durationMs === 'number' && (
                <p className="body-small tw-opacity-70">{entry.durationMs.toFixed(0)} ms</p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
