import { getStatusStyle } from '../../utils/orderStatus';

export default function TableSummaryCards({ counts, total }) {
  const tiles = [
    { key: 'Total', label: 'Total Tables', value: total, dotClass: 'bg-ink' },
    { key: 'AVAILABLE', label: 'Available', value: counts.AVAILABLE || 0, dotClass: getStatusStyle('AVAILABLE').dot },
    { key: 'OCCUPIED', label: 'Occupied', value: counts.OCCUPIED || 0, dotClass: getStatusStyle('OCCUPIED').dot },
    { key: 'INACTIVE', label: 'Inactive', value: counts.INACTIVE || 0, dotClass: getStatusStyle('INACTIVE').dot },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
