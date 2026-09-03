import { Users, ClipboardList, QrCode, Pencil, Power, PowerOff } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import QrPreview from '../ui/QrPreview';

export default function TableCard({ table, activeOrderCount, onViewQR, onEdit, onToggleStatus }) {
  const isInactive = table.status === 'INACTIVE';

  return (
    <div className="flex flex-col rounded-card bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Table</p>
          <h3 className="text-lg font-bold text-ink">{table.tableNumber}</h3>
        </div>
        <StatusBadge status={table.status} />
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <Users size={15} />
          {table.capacity} people
        </span>
        <span className="flex items-center gap-1.5">
          <ClipboardList size={15} />
          {activeOrderCount} active {activeOrderCount === 1 ? 'order' : 'orders'}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-lg bg-surface-muted p-3">
        <QrPreview value={table.qrCode} size={44} />
        <div className="min-w-0">
          <p className="text-xs text-gray-400">QR ID</p>
          <p className="truncate text-sm font-medium text-ink">{table.qrCode}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onViewQR(table)}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-sm font-medium text-ink hover:bg-surface-muted"
        >
          <QrCode size={15} />
          View QR
        </button>
        <button
          type="button"
          onClick={() => onEdit(table)}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-sm font-medium text-ink hover:bg-surface-muted"
        >
          <Pencil size={15} />
          Edit
        </button>
      </div>

      <button
        type="button"
        onClick={() => onToggleStatus(table)}
        className={`mt-2 flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium ${
          isInactive
            ? 'bg-primary text-ink hover:bg-primary-hover'
            : 'border border-red-200 text-red-600 hover:bg-red-50'
        }`}
      >
        {isInactive ? <Power size={15} /> : <PowerOff size={15} />}
        {isInactive ? 'Activate' : 'Deactivate'}
      </button>
    </div>
  );
}
