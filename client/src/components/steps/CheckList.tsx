import { CheckEvaluationResult } from '../../lib/checks';

interface CheckListProps {
  results: CheckEvaluationResult[];
}

export function CheckList({ results }: CheckListProps) {
  if (!results.length) {
    return <p className="body-small tw-text-neutral tw-opacity-70">No checks evaluated yet.</p>;
  }

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      {results.map((result) => (
        <div
          key={result.checkId}
          className={`box card tw-p-3 tw-flex tw-items-center tw-gap-3 ${
            result.passed ? 'tw-border-success' : 'tw-border-danger'
          }`}
        >
          <span className={`tag ${result.passed ? 'tag-positive' : 'tag-danger'}`}>
            {result.passed ? 'Pass' : 'Fail'}
          </span>
          <div>
            <p className="body-default tw-font-semibold">{result.checkId}</p>
            <p className="body-small">{result.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
