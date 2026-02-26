import { KeyboardEvent, ReactNode, useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
}

export function Tabs({ tabs }: TabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const selectTab = (id: string) => {
    setActiveId(id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (tabs.length === 0) {
      return;
    }
    const isRight = event.key === 'ArrowRight';
    const isLeft = event.key === 'ArrowLeft';
    if (!isRight && !isLeft) {
      return;
    }
    event.preventDefault();
    const nextIndex = isRight ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];
    selectTab(nextTab.id);
    window.requestAnimationFrame(() => {
      const container = event.currentTarget.parentElement;
      const buttons = container?.querySelectorAll<HTMLButtonElement>('[data-tab-button="true"]');
      const target = buttons?.[nextIndex];
      target?.focus();
    });
  };

  return (
    <div className="tw-flex tw-flex-col">
      <div className="tw-flex tw-gap-2 tw-border-b tw-border-border" role="tablist">
        {tabs.map((tab, index) => {
          const isActive = activeTab?.id === tab.id;
          return (
            <button
              key={tab.id}
              className={`button button-text tw-px-3 tw-py-2 ${
                isActive ? 'tw-text-primary tw-border-b-2 tw-border-primary tw-font-medium' : 'tw-text-neutral'
              }`}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              data-tab-button="true"
              onClick={() => selectTab(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="tw-mt-3">{activeTab?.content}</div>
    </div>
  );
}
