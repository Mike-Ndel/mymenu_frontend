import { useEffect } from 'react';
import { X, Clock, User, Grid2x2 } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import { formatFCFA } from '../../utils/formatCurrency';
import { formatOrderDateTime } from '../../utils/date';
import { getNextAction, canCancelOrder } from '../../utils/orderStatus';

const PAYMENT_STYLES = {
  Paid: 'bg-emerald-50 text-emerald-700',
  Unpaid: 'bg-amber-50 text-amber-700',
  Refunded: 'bg-gray-100 text-gray-600',
};

export default function OrderDetailsDrawer({ order, onClose, onAdvanceStatus, onCancelOrder }) {
  // Hooks must run on every render (even when `order` is null and the
  // drawer renders nothing), so the Escape listener is only *attached*
  // while there's an order open, and is always cleaned up on close/unmount.
  useEffect(() => {
    if (!order) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [order, onClose]);

  if (!order) return null;

  const nextAction = getNextAction(order.status);
  const showCancel = canCancelOrder(order.status);
  const paymentStyle = PAYMENT_STYLES[order.paymentStatus] || PAYMENT_STYLES.Unpaid;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-drawer-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Order</p>
            <h2 id="order-drawer-title" className="text-lg font-bold text-ink">
              #{order.id}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-400 hover:bg-surface-muted hover:text-ink"
            aria-label="Close order details drawer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Customer + table + time */}
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-surface-muted p-4">
            <div>
              <p className="flex items-center gap-1.5 text-xs text-gray-400">
                <User size={13} /> Customer
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{order.customer.name}</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-xs text-gray-400">
                <Grid2x2 size={13} /> Table
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">Table {order.table.number}</p>
            </div>
            <div className="col-span-2">
              <p className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={13} /> Order time
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">
                {formatOrderDateTime(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="mt-5">
            <h3 className="mb-2 text-sm font-semibold text-ink">Order Items</h3>
            <div className="divide-y divide-gray-50 rounded-lg border border-gray-100">
              {order.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      {item.quantity} × {formatFCFA(item.price)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-ink">
                    {formatFCFA(item.quantity * item.price)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-gray-100 px-1 pt-3">
              <p className="text-sm font-semibold text-ink">Subtotal</p>
              <p className="text-base font-bold text-ink">{formatFCFA(order.total)}</p>
            </div>
          </div>

          {/* Payment + order status */}
          <div className="mt-5 flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
            <div>
              <p className="text-xs text-gray-400">Payment status</p>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${paymentStyle}`}
              >
                {order.paymentStatus}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Order status</p>
              <div className="mt-1">
                <StatusBadge status={order.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {(nextAction || showCancel) && (
          <div className="space-y-2 border-t border-gray-100 px-5 py-4">
            {nextAction && (
              <button
                type="button"
                onClick={() => onAdvanceStatus(order.id, nextAction.nextStatus)}
                className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-ink hover:bg-primary-hover"
              >
                {nextAction.label}
              </button>
            )}
            {showCancel && (
              <button
                type="button"
                onClick={() => onCancelOrder(order.id)}
                className="w-full rounded-lg border border-red-200 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Cancel Order
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
