import { CheckEvaluationResult } from '../../lib/checks';
import { SimulatorConfig } from '../../types/config';
import { HttpResponseData, RequestDraft, RequestHistoryEntry } from '../../types/http';
import { ActivitySection } from './ActivitySection';
import { GuidedStepsSection } from './GuidedStepsSection';
import { RequestSection } from './RequestSection';
import { AppSection, SectionNav } from './SectionNav';

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
  navOpen: boolean;
  section: AppSection;
  onToggleNav: () => void;
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
  navOpen,
  section,
  onToggleNav,
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
  const pageTitle = section === 'request' ? 'Request Workspace' : section === 'guided' ? 'Guided Steps' : 'Activity & Saved';

  return (
    <div className="api-sim-app tw-w-full tw-h-full tw-overflow-hidden">
      <div className="api-sim-topbar tw-flex tw-items-center tw-justify-between tw-gap-2 tw-p-3">
        <div>
          <h2 className="heading-small tw-text-[#0f172a]">{config.title}</h2>
          <p className="body-small tw-text-[#334155]">{pageTitle}</p>
        </div>
        <div className="tw-flex tw-gap-2">
          <button type="button" className="button button-text lg:tw-hidden" onClick={onToggleNav}>
            {navOpen ? 'Close Menu' : 'Menu'}
          </button>
          {section !== 'request' && (
            <button type="button" className="button button-secondary" onClick={() => onSelectSection('request')}>
              Go to Request
            </button>
          )}
        </div>
      </div>

      <div className="api-sim-layout">
        <SectionNav
          active={section}
          open={navOpen}
          onSelect={onSelectSection}
        />

        <section className="api-sim-layout-main tw-min-h-0 tw-overflow-hidden tw-p-3">
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
