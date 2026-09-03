// Single source of truth for status styling — shared by order statuses
// (Overview, Orders) and table statuses (Tables), so StatusBadge renders
// any of them identically without a second styling system.

export const ORDER_STATUSES = ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'];
export const TABLE_STATUSES = ['AVAILABLE', 'OCCUPIED', 'INACTIVE'];

export const STATUS_STYLES = {
  Pending: {
    badge: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
    dot: 'bg-amber-500',
  },
  Preparing: {
    badge: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
    dot: 'bg-blue-500',
  },
  Ready: {
    badge: 'bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-200',
    dot: 'bg-teal-500',
  },
  Completed: {
    badge: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
    dot: 'bg-emerald-500',
  },
  Cancelled: {
    badge: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200',
    dot: 'bg-red-500',
  },
  // Table statuses — Available = positive/green, Occupied = MyMenu yellow,
  // Inactive = neutral/gray.
  AVAILABLE: {
    badge: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
    dot: 'bg-emerald-500',
  },
  OCCUPIED: {
    badge: 'bg-primary/15 text-ink ring-1 ring-inset ring-primary/40',
    dot: 'bg-primary',
  },
  INACTIVE: {
    badge: 'bg-gray-100 text-gray-500 ring-1 ring-inset ring-gray-200',
    dot: 'bg-gray-400',
  },
};

export function getStatusStyle(status) {
  return STATUS_STYLES[status] || STATUS_STYLES.Pending;
}

// Order lifecycle: each status' primary "move it forward" action.
// Completed and Cancelled are terminal — no forward action.
const NEXT_ACTION = {
  Pending: { label: 'Accept Order', nextStatus: 'Preparing' },
  Preparing: { label: 'Mark as Ready', nextStatus: 'Ready' },
  Ready: { label: 'Complete Order', nextStatus: 'Completed' },
  Completed: null,
  Cancelled: null,
};

export function getNextAction(status) {
  return NEXT_ACTION[status] || null;
}

// Cancelling is only meaningful before an order is finished (or already cancelled).
export function canCancelOrder(status) {
  return status === 'Pending' || status === 'Preparing' || status === 'Ready';
}
