import { RequestBodyMode } from '../../../types/http';

interface BodyEditorProps {
  mode: RequestBodyMode;
  text: string;
  locked?: boolean;
  jsonError: string | null;
  onChangeMode: (mode: RequestBodyMode) => void;
  onChangeText: (value: string) => void;
  onPrettify: () => void;
}

const BODY_MODES: RequestBodyMode[] = ['none', 'json', 'text', 'form'];

export function BodyEditor({
  mode,
  text,
  locked,
  jsonError,
  onChangeMode,
  onChangeText,
  onPrettify
}: BodyEditorProps) {
  return (
    <div className="tw-space-y-3">
      <div className="tw-flex tw-flex-wrap tw-gap-2">
        {BODY_MODES.map((item) => (
          <button
            key={item}
            type="button"
            className={`button ${item === mode ? 'button-primary' : 'button-text'}`}
            disabled={locked}
            onClick={() => onChangeMode(item)}
          >
            {item.toUpperCase()}
          </button>
        ))}
        {mode === 'json' && (
          <button type="button" className="button button-text" disabled={locked} onClick={onPrettify}>
            Beautify
          </button>
        )}
      </div>

      {mode !== 'none' && (
        <textarea
          className="input tw-min-h-56 tw-font-mono"
          disabled={locked}
          value={text}
          onChange={(event) => onChangeText(event.target.value)}
          placeholder={mode === 'json' ? '{\n  "key": "value"\n}' : mode === 'form' ? 'name=Alice&role=student' : 'Raw text'}
        />
      )}

      {jsonError && <p className="body-small tw-text-danger">{jsonError}</p>}
      {locked && <p className="body-small tw-text-warning">Locked by task</p>}
    </div>
  );
}
