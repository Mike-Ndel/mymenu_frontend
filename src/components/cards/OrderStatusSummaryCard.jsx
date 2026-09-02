import { ORDER_STATUSES, getStatusStyle } from '../../utils/orderStatus';
import Card from '../ui/Card';

export default function OrderStatusSummaryCard({ counts }) {
  const visibleStatuses = ORDER_STATUSES.filter((status) => status !== 'Cancelled');

  return (
    <Card title="Order Activity" description="Live status breakdown for today">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {visibleStatuses.map((status) => {
          const style = getStatusStyle(status);
          return (
            <div
              key={status}
              className="rounded-lg border border-gray-100 bg-surface-muted px-3 py-3 text-center"
            >
              <span
                className={`mx-auto mb-2 flex h-2.5 w-2.5 items-center justify-center rounded-full ${style.dot}`}
              />
              <p className="text-xl font-bold text-ink">{counts[status] || 0}</p>
              <p className="mt-0.5 text-xs text-gray-500">{status}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
