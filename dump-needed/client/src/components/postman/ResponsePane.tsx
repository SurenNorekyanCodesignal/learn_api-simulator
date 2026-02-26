import { useState } from 'react';
import { HttpResponseData } from '../../types/http';

interface ResponsePaneProps {
  response: HttpResponseData | null;
  error: string | null;
  onCopy: () => void;
}

type ResponseTab = 'pretty' | 'raw' | 'headers';

function statusClass(status: number): string {
  if (status >= 200 && status < 300) {
    return 'tag-positive';
  }
  if (status >= 400) {
    return 'tag-danger';
  }
  return 'tag-warning';
}

export function ResponsePane({ response, error, onCopy }: ResponsePaneProps) {
  const [tab, setTab] = useState<ResponseTab>('pretty');

  if (error) {
    return (
      <div className="box card tw-bg-white tw-p-4 tw-border tw-border-danger">
        <h3 className="heading-small tw-text-danger">Request error</h3>
        <p className="body-default tw-mt-2 tw-text-danger">{error}</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="box card tw-bg-white tw-p-8 tw-text-center tw-h-full tw-flex tw-items-center tw-justify-center">
        <p className="heading-small">Send a request to see a response.</p>
      </div>
    );
  }

  return (
    <div className="box card tw-bg-white tw-p-3 tw-space-y-3 tw-min-w-0 tw-h-full tw-flex tw-flex-col">
      <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2">
        <div className="tw-flex tw-flex-wrap tw-gap-2 tw-items-center">
          <span className={`tag ${statusClass(response.status)}`}>{response.status}</span>
          <span className="body-default">{response.statusText}</span>
          <span className="tag tag-neutral">{Math.round(response.durationMs)} ms</span>
          <span className="tag tag-neutral">{response.sizeBytes} bytes</span>
        </div>
        <button type="button" className="button button-text" onClick={onCopy}>
          Copy response
        </button>
      </div>

      <div className="tw-flex tw-flex-wrap tw-gap-2" role="tablist" aria-label="Response tabs">
        <button type="button" className={`button ${tab === 'pretty' ? 'button-primary' : 'button-text'}`} onClick={() => setTab('pretty')}>
          Pretty
        </button>
        <button type="button" className={`button ${tab === 'raw' ? 'button-primary' : 'button-text'}`} onClick={() => setTab('raw')}>
          Raw
        </button>
        <button type="button" className={`button ${tab === 'headers' ? 'button-primary' : 'button-text'}`} onClick={() => setTab('headers')}>
          Headers
        </button>
      </div>

      <div className="tw-flex-1 tw-min-h-[260px] tw-overflow-auto">
        {tab !== 'headers' ? (
          <pre className="tw-h-full tw-overflow-auto tw-rounded tw-border tw-border-border tw-bg-surface tw-p-3 tw-font-mono tw-text-sm">
            {tab === 'pretty' ? response.prettyBody : response.rawBody}
          </pre>
        ) : (
          <div className="tw-h-full tw-overflow-auto tw-space-y-1 tw-rounded tw-border tw-border-border tw-bg-surface tw-p-3">
            {Object.entries(response.headers).map(([key, value]) => (
              <div key={key} className="tw-grid tw-grid-cols-[minmax(140px,220px)_1fr] tw-gap-2 tw-items-start">
                <span className="body-small tw-font-semibold">{key}</span>
                <span className="body-small tw-break-all">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
