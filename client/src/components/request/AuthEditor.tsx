import { AuthState, AuthType } from '../../types/http';

interface AuthEditorProps {
  value: AuthState;
  onChange: (value: AuthState) => void;
  locked?: boolean;
}

const AUTH_OPTIONS: { label: string; value: AuthType }[] = [
  { label: 'None', value: 'none' },
  { label: 'Bearer Token', value: 'bearer' },
  { label: 'Basic Auth', value: 'basic' }
];

export function AuthEditor({ value, onChange, locked }: AuthEditorProps) {
  const handleTypeChange = (type: AuthType) => {
    onChange({ ...value, type });
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-3">
      <div className="tw-flex tw-gap-3">
        {AUTH_OPTIONS.map((option) => (
          <label key={option.value} className="row tw-gap-2">
            <input
              type="radio"
              name="auth-type"
              value={option.value}
              className="tw-hidden"
              checked={value.type === option.value}
              disabled={locked}
              onChange={() => handleTypeChange(option.value)}
            />
            <span
              className={`tag ${
                value.type === option.value ? 'tag-primary' : 'tag-neutral'
              } tw-cursor-pointer`}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {value.type === 'bearer' && (
        <label>
          Token
          <input
            type="text"
            className="input"
            disabled={locked}
            value={value.token}
            onChange={(e) => onChange({ ...value, token: e.target.value })}
            placeholder="Enter bearer token"
          />
        </label>
      )}
      {value.type === 'basic' && (
        <div className="tw-grid tw-grid-cols-2 tw-gap-3">
          <label>
            Username
            <input
              type="text"
              className="input"
              disabled={locked}
              value={value.username}
              onChange={(e) => onChange({ ...value, username: e.target.value })}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              className="input"
              disabled={locked}
              value={value.password}
              onChange={(e) => onChange({ ...value, password: e.target.value })}
            />
          </label>
        </div>
      )}
      {locked && <p className="body-small tw-text-warning">Locked by task</p>}
    </div>
  );
}
