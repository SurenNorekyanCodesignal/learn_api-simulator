import { CheckEvaluationResult } from '../../lib/checks';
import { SimulatorConfig } from '../../types/config';
import { HttpResponseData, RequestDraft, RequestHistoryEntry } from '../../types/http';
import { ActivitySection } from './ActivitySection';
import { GuidedStepsSection } from './GuidedStepsSection';
import { RequestSection } from './RequestSection';
import { AppSection } from './SectionNav';

interface SavedRequest {
  id: string;
  name: string;
  draft: RequestDraft;
}

interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
}

interface PostmanPageProps {
  config: SimulatorConfig;
  draft: RequestDraft;
  isSending: boolean;
  response: HttpResponseData | null;
  requestError: string | null;
  selectedStepId: string | null;
  completedStepIds: string[];
  checkResults: CheckEvaluationResult[];
  history: RequestHistoryEntry[];
  savedRequests: SavedRequest[];
  activity: ActivityItem[];
  section: AppSection;
  onSelectSection: (section: AppSection) => void;
  onSelectStep: (stepId: string | null) => void;
  onRunStep: () => void;
  onDraftChange: (draft: RequestDraft) => void;
  onSend: () => void;
  onCopyCurl: () => void;
  onSaveRequest: () => void;
  onNewRequest: () => void;
  onCopyResponse: () => void;
  onRestoreHistory: (entry: RequestHistoryEntry) => void;
  onClearHistory: () => void;
  onRestoreSaved: (item: SavedRequest) => void;
}

export function PostmanPage({
  config,
  draft,
  isSending,
  response,
  requestError,
  selectedStepId,
  completedStepIds,
  checkResults,
  history,
  savedRequests,
  activity,
  section,
  onSelectSection,
  onSelectStep,
  onRunStep,
  onDraftChange,
  onSend,
  onCopyCurl,
  onSaveRequest,
  onNewRequest,
  onCopyResponse,
  onRestoreHistory,
  onClearHistory,
  onRestoreSaved
}: PostmanPageProps) {
  return (
    <div className="api-sim-app tw-w-full tw-h-full tw-overflow-hidden">
      <div className="api-sim-topbar">
        <div className="api-sim-brand">
          <h2 className="heading-small">API Simulator</h2>
        </div>
        <div className="api-sim-topbar-controls">
          <div className="api-sim-section-switcher" role="tablist" aria-label="Workspace sections">
            <button
              type="button"
              role="tab"
              aria-selected={section === 'request'}
              className={`api-section-tab ${section === 'request' ? 'api-section-tab-active' : ''}`}
              onClick={() => onSelectSection('request')}
            >
              Request
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={section === 'guided'}
              className={`api-section-tab ${section === 'guided' ? 'api-section-tab-active' : ''}`}
              onClick={() => onSelectSection('guided')}
            >
              Guided Steps
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={section === 'activity'}
              className={`api-section-tab ${section === 'activity' ? 'api-section-tab-active' : ''}`}
              onClick={() => onSelectSection('activity')}
            >
              Activity
            </button>
          </div>
          <button
            type="button"
            className="button button-text api-help-button"
            onClick={() => {
              const helpButton = document.getElementById('btn-help') as HTMLButtonElement | null;
              helpButton?.click();
            }}
          >
            Help
          </button>
        </div>
      </div>

      <div className="api-sim-layout">
        <section className="api-sim-layout-main tw-min-h-0 tw-overflow-hidden tw-p-4">
          {section === 'request' && (
            <div className="tw-grid tw-grid-cols-1 tw-gap-3 tw-h-full tw-min-h-0">
              <div className="tw-h-full tw-min-h-0">
                <RequestSection
                  draft={draft}
                  allowEditing={config.steps.find((step) => step.id === selectedStepId)?.request.allowEditing}
                  isSending={isSending}
                  response={response}
                  requestError={requestError}
                  history={history}
                  onDraftChange={onDraftChange}
                  onSend={onSend}
                  onCopyCurl={onCopyCurl}
                  onSaveRequest={onSaveRequest}
                  onNewRequest={onNewRequest}
                  onCopyResponse={onCopyResponse}
                  onRestoreHistory={onRestoreHistory}
                  onClearHistory={onClearHistory}
                />
              </div>
            </div>
          )}

          {section === 'guided' && (
            <GuidedStepsSection
              steps={config.steps}
              selectedStepId={selectedStepId}
              completedStepIds={completedStepIds}
              checkResults={checkResults}
              onSelectStep={onSelectStep}
              onRunStep={onRunStep}
              isSending={isSending}
            />
          )}

          {section === 'activity' && (
            <ActivitySection activity={activity} savedRequests={savedRequests} onRestoreSaved={onRestoreSaved} />
          )}
        </section>
      </div>
    </div>
  );
}
