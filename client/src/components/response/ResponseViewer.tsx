import { HttpResponseData } from '../../types/http';
import { Tabs } from '../common/Tabs';

interface ResponseViewerProps {
  response: HttpResponseData | null;
  error?: string | null;
  onCopy?: () => void;
}

function statusClass(status: number): string {
  if (status >= 200 && status < 300) {
    return 'tag-positive';
  }
  if (status >= 400) {
    return 'tag-danger';
  }
  return 'tag-neutral';
}

export function ResponseViewer({ response, error, onCopy }: ResponseViewerProps) {
  if (error) {
    return (
      <div className="box card tw-p-4 tw-border tw-border-danger">
        <p className="heading-small tw-text-danger">Request Failed</p>
        <p className="body-default tw-text-danger tw-mt-2">{error}</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="box card tw-p-8 tw-text-center tw-bg-white">
        <p className="heading-small">Send a request to see a response.</p>
      </div>
    );
  }

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <div className="box card tw-bg-white tw-p-3 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2">
        <div className="tw-flex tw-flex-wrap tw-gap-2 tw-items-center">
          <span className={`tag ${statusClass(response.status)}`}>{response.status}</span>
          <span className="body-default">{response.statusText}</span>
          <span className="tag tag-neutral">{response.durationMs.toFixed(0)} ms</span>
          <span className="tag tag-neutral">{response.sizeBytes} bytes</span>
        </div>
        <div className="tw-flex tw-gap-2">
          <button type="button" className="button button-text" onClick={onCopy}>
            Copy response
          </button>
        </div>
      </div>

      <div className="box card tw-bg-white tw-p-3">
        <Tabs
          tabs={[
            {
              id: 'pretty',
              label: 'Pretty',
              content: (
                <pre className="tw-max-h-[28rem] tw-overflow-auto tw-rounded tw-border tw-border-border tw-bg-surface tw-p-3 tw-font-mono tw-text-sm">
                  {response.prettyBody}
                </pre>
              )
            },
            {
              id: 'raw',
              label: 'Raw',
              content: (
                <pre className="tw-max-h-[28rem] tw-overflow-auto tw-rounded tw-border tw-border-border tw-bg-surface tw-p-3 tw-font-mono tw-text-sm">
                  {response.rawBody}
                </pre>
              )
            },
            {
              id: 'headers',
              label: 'Headers',
              content: (
                <div className="tw-flex tw-flex-col tw-gap-2 tw-max-h-[28rem] tw-overflow-auto">
                  {Object.entries(response.headers).map(([key, value]) => (
                    <div key={key} className="tw-grid tw-grid-cols-[minmax(140px,220px)_1fr] tw-gap-2 tw-text-sm">
                      <span className="tw-font-semibold">{key}</span>
                      <span className="tw-break-all">{value}</span>
                    </div>
                  ))}
                </div>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}
