import { BodyState } from '../../types/http';

interface BodyEditorProps {
  value: BodyState;
  onChange: (value: BodyState) => void;
  locked?: boolean;
}

function isValidJson(text: string): boolean {
  if (!text.trim()) {
    return true;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (_error) {
    return false;
  }
}

export function BodyEditor({ value, onChange, locked }: BodyEditorProps) {
  const handleModeChange = (mode: BodyState['mode']) => {
    onChange({
      ...value,
      mode,
      isValidJson: mode === 'json' ? isValidJson(value.text) : true
    });
  };

  const handleTextChange = (text: string) => {
    onChange({
      ...value,
      text,
      isValidJson: value.mode === 'json' ? isValidJson(text) : true
    });
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-3">
      <div className="tw-flex tw-gap-3">
        {['json', 'text'].map((mode) => (
          <label key={mode} className="row tw-gap-2">
            <input
              type="radio"
              name="body-mode"
              className="tw-hidden"
              checked={value.mode === mode}
              disabled={locked}
              onChange={() => handleModeChange(mode as BodyState['mode'])}
            />
            <span className={`tag ${value.mode === mode ? 'tag-primary' : 'tag-neutral'}`}>
              {mode === 'json' ? 'JSON' : 'Text'}
            </span>
          </label>
        ))}
      </div>
      <textarea
        className="input"
        rows={10}
        value={value.text}
        disabled={locked}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder={value.mode === 'json' ? '{\n  "name": "Example"\n}' : 'Raw body'}
      />
      {value.mode === 'json' && !value.isValidJson && (
        <p className="body-small tw-text-danger">Invalid JSON</p>
      )}
      {locked && <p className="body-small tw-text-warning">Locked by task</p>}
    </div>
  );
}
