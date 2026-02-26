import { useMemo, useState } from 'react';
import { Tabs } from '../common/Tabs';
import { RequestDraft, RequestKVRow } from '../../types/http';
import { ConfigRequestPreset } from '../../types/config';
import { generateId } from '../../lib/id';

interface RequestBuilderProps {
  draft: RequestDraft;
  onChange: (updater: (prev: RequestDraft) => RequestDraft) => void;
  onSend: () => void;
  onCopyCurl: () => void;
  onSave: () => void;
  onClear: () => void;
  isSending: boolean;
  sendDisabled: boolean;
  sendDisabledReason?: string;
  allowEditing?: ConfigRequestPreset['allowEditing'];
  jsonError?: string | null;
}

const METHODS: RequestDraft['method'][] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

function updateRow(rows: RequestKVRow[], id: string, patch: Partial<RequestKVRow>): RequestKVRow[] {
  return rows.map((row) => (row.id === id ? { ...row, ...patch } : row));
}

function removeRow(rows: RequestKVRow[], id: string): RequestKVRow[] {
  const next = rows.filter((row) => row.id !== id);
  return next.length > 0 ? next : [{ id: generateId(), key: '', value: '', enabled: true }];
}

function parseBulkRows(input: string): RequestKVRow[] {
  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [{ id: generateId(), key: '', value: '', enabled: true }];
  }

  return lines.map((line) => {
    const [key, ...rest] = line.split('=');
    return {
      id: generateId(),
      key: key.trim(),
      value: rest.join('=').trim(),
      enabled: true
    };
  });
}

function KeyValueTable({
  title,
  rows,
  onRows,
  locked
}: {
  title: string;
  rows: RequestKVRow[];
  onRows: (rows: RequestKVRow[]) => void;
  locked: boolean;
}) {
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkText, setBulkText] = useState('');

  return (
    <div className="tw-flex tw-flex-col tw-gap-3">
      <div className="row-between">
        <h4 className="body-default tw-font-semibold">{title}</h4>
        <div className="tw-flex tw-gap-2">
          <button type="button" className="button button-text" onClick={() => setBulkMode((prev) => !prev)} disabled={locked}>
            {bulkMode ? 'Table' : 'Bulk Edit'}
          </button>
          <button
            type="button"
            className="button button-text"
            onClick={() => onRows([...rows, { id: generateId(), key: '', value: '', enabled: true }])}
            disabled={locked}
          >
            + Add
          </button>
        </div>
      </div>

      {bulkMode ? (
        <div className="tw-flex tw-flex-col tw-gap-2">
          <textarea
            className="input tw-min-h-36"
            value={bulkText}
            disabled={locked}
            onChange={(event) => setBulkText(event.target.value)}
            placeholder="key=value"
          />
          <button
            type="button"
            className="button button-secondary"
            disabled={locked}
            onClick={() => onRows(parseBulkRows(bulkText))}
          >
            Apply
          </button>
        </div>
      ) : (
        <div className="tw-flex tw-flex-col tw-gap-2">
          {rows.map((row) => (
            <div key={row.id} className="tw-grid tw-grid-cols-[auto_1fr_1fr_auto] tw-gap-2 tw-items-center">
              <input
                type="checkbox"
                checked={row.enabled}
                disabled={locked}
                onChange={(event) => onRows(updateRow(rows, row.id, { enabled: event.target.checked }))}
              />
              <input
                className="input"
                type="text"
                placeholder="Key"
                value={row.key}
                disabled={locked}
                onChange={(event) => onRows(updateRow(rows, row.id, { key: event.target.value }))}
              />
              <input
                className="input"
                type="text"
                placeholder="Value"
                value={row.value}
                disabled={locked}
                onChange={(event) => onRows(updateRow(rows, row.id, { value: event.target.value }))}
              />
              <button
                type="button"
                className="button button-text tw-text-danger"
                disabled={locked}
                onClick={() => onRows(removeRow(rows, row.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {locked && <p className="body-small tw-text-warning">Locked by task</p>}
    </div>
  );
}

export function RequestBuilder({
  draft,
  onChange,
  onSend,
  onCopyCurl,
  onSave,
  onClear,
  isSending,
  sendDisabled,
  sendDisabledReason,
  allowEditing,
  jsonError
}: RequestBuilderProps) {
  const editable = useMemo(() => {
    return {
      method: allowEditing?.method ?? true,
      path: allowEditing?.path ?? true,
      query: allowEditing?.query ?? true,
      headers: allowEditing?.headers ?? true,
      auth: allowEditing?.auth ?? true,
      body: allowEditing?.body ?? true
    };
  }, [allowEditing]);

  const topUrlEditor =
    draft.urlMode === 'full' ? (
      <input
        className="input"
        value={draft.fullUrl}
        disabled={!editable.path}
        onChange={(event) => onChange((prev) => ({ ...prev, fullUrl: event.target.value }))}
        placeholder="https://api.example.com/users"
      />
    ) : (
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2">
        <input
          className="input"
          value={draft.baseUrl}
          disabled={!editable.path}
          onChange={(event) => onChange((prev) => ({ ...prev, baseUrl: event.target.value }))}
          placeholder="/demo"
        />
        <input
          className="input"
          value={draft.path}
          disabled={!editable.path}
          onChange={(event) => onChange((prev) => ({ ...prev, path: event.target.value }))}
          placeholder="/users"
        />
      </div>
    );

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <div className="box card tw-p-3 tw-bg-white">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[auto_1fr_auto] tw-gap-3 tw-items-end">
          <div className="tw-flex tw-gap-2 tw-items-end">
            <label className="tw-flex tw-flex-col">
              <span className="body-small tw-opacity-70">Method</span>
              <select
                className="input"
                value={draft.method}
                disabled={!editable.method}
                onChange={(event) => onChange((prev) => ({ ...prev, method: event.target.value as RequestDraft['method'] }))}
              >
                {METHODS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </label>
            <label className="tw-flex tw-flex-col">
              <span className="body-small tw-opacity-70">URL Mode</span>
              <select
                className="input"
                value={draft.urlMode}
                disabled={!editable.path}
                onChange={(event) => onChange((prev) => ({ ...prev, urlMode: event.target.value as RequestDraft['urlMode'] }))}
              >
                <option value="split">Base + Path</option>
                <option value="full">Full URL</option>
              </select>
            </label>
          </div>

          <div className="tw-flex tw-flex-col tw-gap-2">
            <span className="body-small tw-opacity-70">URL</span>
            {topUrlEditor}
          </div>

          <div className="tw-flex tw-flex-wrap tw-gap-2 lg:tw-justify-end">
            <button type="button" className="button button-primary" onClick={onSend} disabled={isSending || sendDisabled}>
              {isSending ? 'Sending...' : 'Send'}
            </button>
            <button type="button" className="button button-secondary" onClick={onCopyCurl}>
              Copy as cURL
            </button>
            <button type="button" className="button button-tertiary" onClick={onSave}>
              Save
            </button>
            <button type="button" className="button button-text" onClick={onClear}>
              Clear
            </button>
          </div>
        </div>
        {sendDisabledReason && <p className="body-small tw-text-warning tw-mt-2">{sendDisabledReason}</p>}
      </div>

      <Tabs
        tabs={[
          {
            id: 'params',
            label: 'Params',
            content: (
              <KeyValueTable
                title="Query Params"
                rows={draft.query}
                locked={!editable.query}
                onRows={(rows) => onChange((prev) => ({ ...prev, query: rows }))}
              />
            )
          },
          {
            id: 'authorization',
            label: 'Authorization',
            content: (
              <div className="tw-flex tw-flex-col tw-gap-3">
                <label>
                  Auth Type
                  <select
                    className="input"
                    value={draft.auth.type}
                    disabled={!editable.auth}
                    onChange={(event) =>
                      onChange((prev) => ({
                        ...prev,
                        auth: { ...prev.auth, type: event.target.value as RequestDraft['auth']['type'] }
                      }))
                    }
                  >
                    <option value="none">None</option>
                    <option value="bearer">Bearer Token</option>
                    <option value="basic">Basic Auth</option>
                  </select>
                </label>
                {draft.auth.type === 'bearer' && (
                  <label>
                    Token
                    <input
                      className="input"
                      type="password"
                      disabled={!editable.auth}
                      value={draft.auth.bearerToken ?? ''}
                      onChange={(event) =>
                        onChange((prev) => ({
                          ...prev,
                          auth: { ...prev.auth, bearerToken: event.target.value }
                        }))
                      }
                    />
                  </label>
                )}
                {draft.auth.type === 'basic' && (
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2">
                    <label>
                      Username
                      <input
                        className="input"
                        type="text"
                        disabled={!editable.auth}
                        value={draft.auth.username ?? ''}
                        onChange={(event) =>
                          onChange((prev) => ({
                            ...prev,
                            auth: { ...prev.auth, username: event.target.value }
                          }))
                        }
                      />
                    </label>
                    <label>
                      Password
                      <input
                        className="input"
                        type="password"
                        disabled={!editable.auth}
                        value={draft.auth.password ?? ''}
                        onChange={(event) =>
                          onChange((prev) => ({
                            ...prev,
                            auth: { ...prev.auth, password: event.target.value }
                          }))
                        }
                      />
                    </label>
                  </div>
                )}
                {!editable.auth && <p className="body-small tw-text-warning">Locked by task</p>}
              </div>
            )
          },
          {
            id: 'headers',
            label: 'Headers',
            content: (
              <KeyValueTable
                title="Headers"
                rows={draft.headers}
                locked={!editable.headers}
                onRows={(rows) => onChange((prev) => ({ ...prev, headers: rows }))}
              />
            )
          },
          {
            id: 'body',
            label: 'Body',
            content: (
              <div className="tw-flex tw-flex-col tw-gap-3">
                <div className="tw-flex tw-gap-2">
                  {(['none', 'json', 'text'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className={`button ${draft.body.mode === mode ? 'button-primary' : 'button-text'}`}
                      disabled={!editable.body}
                      onClick={() =>
                        onChange((prev) => {
                          const nextHeaders =
                            mode === 'json' &&
                            !prev.headers.some((row) => row.key.toLowerCase() === 'content-type')
                              ? [...prev.headers, { id: generateId(), key: 'Content-Type', value: 'application/json', enabled: true }]
                              : prev.headers;
                          return { ...prev, headers: nextHeaders, body: { ...prev.body, mode } };
                        })
                      }
                    >
                      {mode.toUpperCase()}
                    </button>
                  ))}
                  {draft.body.mode === 'json' && (
                    <button
                      type="button"
                      className="button button-text"
                      disabled={!editable.body}
                      onClick={() => {
                        onChange((prev) => {
                          try {
                            const parsed = JSON.parse(prev.body.text);
                            return { ...prev, body: { ...prev.body, text: JSON.stringify(parsed, null, 2) } };
                          } catch (_error) {
                            return prev;
                          }
                        });
                      }}
                    >
                      Prettify
                    </button>
                  )}
                </div>
                {draft.body.mode !== 'none' && (
                  <textarea
                    className="input tw-min-h-48 tw-font-mono"
                    disabled={!editable.body}
                    value={draft.body.text}
                    onChange={(event) => onChange((prev) => ({ ...prev, body: { ...prev.body, text: event.target.value } }))}
                  />
                )}
                {jsonError && <p className="body-small tw-text-danger">{jsonError}</p>}
                {!editable.body && <p className="body-small tw-text-warning">Locked by task</p>}
              </div>
            )
          }
        ]}
      />
    </div>
  );
}
