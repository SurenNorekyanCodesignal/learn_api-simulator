import { SimulatorEvent } from '../../types/events';

interface ActivityLogProps {
  events: SimulatorEvent[];
}

export function ActivityLog({ events }: ActivityLogProps) {
  if (!events.length) {
    return <p className="body-small tw-text-neutral tw-opacity-70">No activity yet.</p>;
  }

  return (
    <div className="tw-flex tw-flex-col tw-gap-2 tw-max-h-48 tw-overflow-auto">
      {events.map((event) => {
        const rawPayload = JSON.stringify(event.payload) ?? '';
        const payloadPreview = rawPayload.slice(0, 80);
        return (
          <div key={`${event.timestamp}-${event.eventType}`} className="tw-flex tw-flex-col tw-gap-1 tw-text-sm tw-border-b tw-border-border tw-pb-2 last:tw-border-b-0">
            <div className="tw-flex tw-gap-3 tw-items-center">
              <span className="tw-text-neutral tw-opacity-70 tw-font-mono">
                {new Date(event.timestamp).toLocaleTimeString()}
              </span>
              <span className="tw-font-semibold">{event.eventType}</span>
              {event.stepId && <span className="tag tag-neutral">{event.stepId}</span>}
            </div>
            <span className="tw-text-neutral tw-opacity-80 tw-font-mono tw-text-xs">
              {payloadPreview}
              {payloadPreview.length >= 80 ? '…' : ''}
            </span>
          </div>
        );
      })}
    </div>
  );
}
