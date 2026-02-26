import { ReactNode } from 'react';

export type EditorTabKey = 'params' | 'authorization' | 'headers' | 'body';

interface EditorTabsProps {
  activeTab: EditorTabKey;
  onChange: (tab: EditorTabKey) => void;
  sections: Record<EditorTabKey, ReactNode>;
}

const TAB_ITEMS: Array<{ id: EditorTabKey; label: string }> = [
  { id: 'params', label: 'Params' },
  { id: 'authorization', label: 'Authorization' },
  { id: 'headers', label: 'Headers' },
  { id: 'body', label: 'Body' }
];

export function EditorTabs({ activeTab, onChange, sections }: EditorTabsProps) {
  return (
    <div className="box card tw-bg-white tw-p-3 tw-space-y-3 tw-min-h-[240px]">
      <div className="tw-flex tw-flex-wrap tw-gap-2" role="tablist" aria-label="Request editor tabs">
        {TAB_ITEMS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`button ${isActive ? 'button-primary' : 'button-text'}`}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="tw-max-h-[300px] tw-overflow-auto">
        {sections[activeTab]}
      </div>
    </div>
  );
}
