import { ReactNode } from 'react';

interface SimulatorLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  secondary: ReactNode;
  footer: ReactNode;
}

export function SimulatorLayout({ sidebar, main, secondary, footer }: SimulatorLayoutProps) {
  return (
    <div className="api-sim-app tw-flex-1 tw-w-full tw-flex tw-flex-col">
      <main className="api-sim-layout tw-flex-1">
        <aside className="api-sim-layout-sidebar tw-flex tw-flex-col tw-gap-4">{sidebar}</aside>
        <section className="api-sim-layout-main tw-h-full tw-overflow-auto">
          <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4 tw-h-full">
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 tw-flex-1">
              <div className="api-sim-panel tw-p-4 tw-flex tw-flex-col tw-gap-4">{main}</div>
              <div className="api-sim-panel tw-p-4 tw-flex tw-flex-col tw-gap-4">{secondary}</div>
            </div>
            <div className="api-sim-panel tw-p-4">{footer}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
