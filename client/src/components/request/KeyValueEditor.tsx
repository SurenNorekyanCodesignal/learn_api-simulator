import { generateId } from '../../lib/id';
import { HeaderRow, QueryParamRow } from '../../types/http';

export interface EditableRow extends HeaderRow {}

interface KeyValueEditorProps {
  title: string;
  rows: EditableRow[];
  onChange: (rows: EditableRow[]) => void;
  locked?: boolean;
}

export function KeyValueEditor({ title, rows, onChange, locked }: KeyValueEditorProps) {
  const handleFieldChange = (id: string, field: keyof EditableRow, value: string | boolean) => {
    onChange(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleAddRow = () => {
    onChange([...rows, { id: generateId(), key: '', value: '', enabled: true }]);
  };

  const handleRemoveRow = (id: string) => {
    onChange(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <div className="row-between">
        <h4 className="body-default tw-font-semibold">{title}</h4>
        <button
          type="button"
          className="button button-text"
          onClick={handleAddRow}
          disabled={locked}
        >
          + Add
        </button>
      </div>
      <div className="tw-flex tw-flex-col tw-gap-2">
        {rows.map((row) => (
          <div key={row.id} className="tw-grid tw-grid-cols-[auto_1fr_1fr_auto] tw-gap-3 tw-items-center">
            <label className="body-small tw-flex tw-items-center tw-gap-2">
              <input
                type="checkbox"
                disabled={locked}
                checked={row.enabled}
                onChange={(e) => handleFieldChange(row.id, 'enabled', e.target.checked)}
              />
              <span>On</span>
            </label>
            <input
              className="input"
              type="text"
              placeholder="Key"
              disabled={locked}
              value={row.key}
              onChange={(e) => handleFieldChange(row.id, 'key', e.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="Value"
              disabled={locked}
              value={row.value}
              onChange={(e) => handleFieldChange(row.id, 'value', e.target.value)}
            />
            <button
              type="button"
              className="button button-text tw-text-danger"
              onClick={() => handleRemoveRow(row.id)}
              disabled={locked}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {locked && <p className="body-small tw-text-warning">Locked by task</p>}
    </div>
  );
}
