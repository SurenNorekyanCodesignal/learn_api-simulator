import { StepConfig } from '../../types/config';

interface StepListProps {
  steps: StepConfig[];
  completedStepIds: string[];
  selectedStepId: string | null;
  onSelect: (step: StepConfig) => void;
}

export function StepList({ steps, completedStepIds, selectedStepId, onSelect }: StepListProps) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <div className="row-between">
        <h4 className="heading-small">Steps</h4>
        <span className="body-small tw-opacity-70">
          {completedStepIds.length}/{steps.length}
        </span>
      </div>
      {steps.map((step) => {
        const completed = completedStepIds.includes(step.id);
        return (
          <button
            key={step.id}
            type="button"
            className={`box card tw-w-full tw-text-left tw-p-3 ${selectedStepId === step.id ? 'tw-border-primary' : ''}`}
            onClick={() => onSelect(step)}
          >
            <div className="tw-flex tw-items-start tw-justify-between tw-gap-2">
              <div>
                <p className="body-default tw-font-semibold">{step.title}</p>
                <p className="body-small tw-opacity-70">{step.description}</p>
              </div>
              <span className={`tag ${completed ? 'tag-positive' : 'tag-neutral'}`}>
                {completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
