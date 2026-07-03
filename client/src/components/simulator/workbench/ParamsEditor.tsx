import { RequestKVRow } from '../../../types/http';
import { KeyValueRowsEditor } from './KeyValueRowsEditor';

interface ParamsEditorProps {
  rows: RequestKVRow[];
  locked?: boolean;
  onChange: (rows: RequestKVRow[]) => void;
}

export function ParamsEditor({ rows, locked, onChange }: ParamsEditorProps) {
  return <KeyValueRowsEditor rows={rows} locked={locked} onChange={onChange} keyPlaceholder="Param" valuePlaceholder="Value" />;
}
