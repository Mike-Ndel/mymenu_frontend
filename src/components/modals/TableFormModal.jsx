import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'OCCUPIED', label: 'Occupied' },
  { value: 'INACTIVE', label: 'Inactive' },
];

export default function TableFormModal({ mode, initialValues, existingTableNumbers, onClose, onSubmit }) {
  const [tableNumber, setTableNumber] = useState(initialValues?.tableNumber ?? '');
  const [capacity, setCapacity] = useState(
    initialValues?.capacity != null ? String(initialValues.capacity) : ''
  );
  const [status, setStatus] = useState(initialValues?.status ?? 'AVAILABLE');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedNumber = tableNumber.trim();
    const parsedCapacity = Number(capacity);
    const nextErrors = {};

    if (!trimmedNumber) {
      nextErrors.tableNumber = 'Table number is required.';
    } else if (existingTableNumbers.includes(trimmedNumber)) {
      nextErrors.tableNumber = 'This table number already exists.';
    }

    if (!capacity.trim()) {
      nextErrors.capacity = 'Capacity is required.';
    } else if (Number.isNaN(parsedCapacity) || parsedCapacity <= 0) {
      nextErrors.capacity = 'Capacity must be greater than 0.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({ tableNumber: trimmedNumber, capacity: parsedCapacity, status });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="table-form-title"
        className="relative w-full max-w-sm rounded-card bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 id="table-form-title" className="text-lg font-bold text-ink">
            {mode === 'edit' ? 'Edit Table' : 'Add Table'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-400 hover:bg-surface-muted hover:text-ink"
            aria-label="Close table form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label htmlFor="table-number" className="mb-1 block text-sm font-medium text-ink">
              Table Number
            </label>
            <input
              id="table-number"
              type="text"
              value={tableNumber}
              onChange={(event) => setTableNumber(event.target.value)}
              placeholder="e.g. 13"
              className={`w-full rounded-lg border px-3 py-2 text-sm text-ink focus:outline-none ${
                errors.tableNumber
                  ? 'border-red-300 focus:border-red-400'
                  : 'border-gray-200 focus:border-primary'
              }`}
            />
            {errors.tableNumber && (
              <p className="mt-1 text-xs text-red-600">{errors.tableNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="table-capacity" className="mb-1 block text-sm font-medium text-ink">
              Capacity
            </label>
            <input
              id="table-capacity"
              type="number"
              min="1"
              value={capacity}
              onChange={(event) => setCapacity(event.target.value)}
              placeholder="e.g. 4"
              className={`w-full rounded-lg border px-3 py-2 text-sm text-ink focus:outline-none ${
                errors.capacity
                  ? 'border-red-300 focus:border-red-400'
                  : 'border-gray-200 focus:border-primary'
              }`}
            />
            {errors.capacity && <p className="mt-1 text-xs text-red-600">{errors.capacity}</p>}
          </div>

          <div>
            <label htmlFor="table-status" className="mb-1 block text-sm font-medium text-ink">
              Status
            </label>
            <select
              id="table-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-ink hover:bg-surface-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-ink hover:bg-primary-hover"
            >
              {mode === 'edit' ? 'Save Changes' : 'Add Table'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
