import { HttpMethod } from '../../../types/http';

interface RequestBarProps {
  method: HttpMethod;
  url: string;
  isSending: boolean;
  methodDisabled?: boolean;
  urlDisabled?: boolean;
  onChangeMethod: (method: HttpMethod) => void;
  onChangeUrl: (url: string) => void;
  onSend: () => void;
  onCopyCurl: () => void;
  onSave: () => void;
  onClear: () => void;
}

const METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

function methodClass(method: HttpMethod): string {
  switch (method) {
    case 'GET':
      return 'api-method-get';
    case 'POST':
      return 'api-method-post';
    case 'PUT':
    case 'PATCH':
      return 'api-method-put';
    case 'DELETE':
      return 'api-method-delete';
    default:
      return '';
  }
}

export function RequestBar({
  method,
  url,
  isSending,
  methodDisabled = false,
  urlDisabled = false,
  onChangeMethod,
  onChangeUrl,
  onSend,
  onCopyCurl,
  onSave,
  onClear
}: RequestBarProps) {
  return (
    <div className="box card tw-bg-white tw-p-3">
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[120px_1fr_auto] tw-gap-2 tw-items-end">
        <label className="tw-flex tw-flex-col tw-gap-1">
          <span className="body-small tw-opacity-70">Method</span>
          <select
            className={`input ${methodClass(method)}`}
            value={method}
            disabled={methodDisabled}
            onChange={(event) => onChangeMethod(event.target.value as HttpMethod)}
            aria-label="HTTP method"
          >
            {METHODS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="tw-flex tw-flex-col tw-gap-1">
          <span className="body-small tw-opacity-70">URL</span>
          <input
            className="input"
            type="text"
            value={url}
            disabled={urlDisabled}
            onChange={(event) => onChangeUrl(event.target.value)}
            placeholder="http://localhost:3001/demo-api/health"
          />
        </label>

        <div className="tw-flex tw-flex-wrap tw-gap-2 lg:tw-justify-end">
          <button type="button" className="button button-primary" onClick={onSend} disabled={isSending}>
            {isSending ? 'Sending...' : 'Send'}
          </button>
          <button type="button" className="button button-secondary" onClick={onCopyCurl}>
            Copy cURL
          </button>
          <button type="button" className="button button-tertiary" onClick={onSave}>
            Save
          </button>
          <button type="button" className="button button-text" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
