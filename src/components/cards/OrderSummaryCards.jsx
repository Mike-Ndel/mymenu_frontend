import { ORDER_STATUSES, getStatusStyle } from '../../utils/orderStatus';

// Purely informational — filtering happens via OrdersFilterBar. Kept
// separate so the summary always reflects the *whole* order list, even
// while a filter is active elsewhere on the page.
export default function OrderSummaryCards({ counts, total }) {
  const visibleStatuses = ORDER_STATUSES.filter((status) => status !== 'Cancelled');

  const tiles = [
    { key: 'All', label: 'All Orders', value: total, dotClass: 'bg-ink' },
    ...visibleStatuses.map((status) => ({
      key: status,
      label: status,
      value: counts[status] || 0,
      dotClass: getStatusStyle(status).dot,
    })),
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((tile) => (
        <div key={tile.key} className="rounded-card bg-white p-4 shadow-card">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${tile.dotClass}`} />
            <span className="text-xs font-medium text-gray-500">{tile.label}</span>
          </div>
          <p className="mt-2 text-xl font-bold text-ink">{tile.value}</p>
        </div>
      ))}
    </div>
  );
}
