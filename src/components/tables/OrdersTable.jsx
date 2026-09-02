import { ClipboardList, Search } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import EmptyState from '../ui/EmptyState';
import { formatFCFA } from '../../utils/formatCurrency';
import { formatOrderTime } from '../../utils/date';
import { getOrderItemCount } from '../../data/orders';

function NextBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-ink">
      Next
    </span>
  );
}

function ViewButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md px-2.5 py-1.5 text-sm font-medium text-ink underline-offset-2 hover:text-primary-hover hover:underline"
    >
      View
    </button>
  );
}

export default function OrdersTable({ orders, oldestPendingId, isFiltered, onView }) {
  if (orders.length === 0) {
    return (
      <EmptyState
        icon={isFiltered ? Search : ClipboardList}
        title={isFiltered ? 'No orders match your search' : 'No orders yet'}
        description={
          isFiltered
            ? 'Try a different order ID, customer name, or table number.'
            : 'Orders placed by customers will show up here.'
        }
      />
    );
  }

  return (
    <>
      {/* Desktop / tablet table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
              <th className="py-2.5 pr-4 font-medium">Order ID</th>
              <th className="py-2.5 pr-4 font-medium">Customer</th>
              <th className="py-2.5 pr-4 font-medium">Table</th>
              <th className="py-2.5 pr-4 font-medium">Items</th>
              <th className="py-2.5 pr-4 font-medium">Total</th>
              <th className="py-2.5 pr-4 font-medium">Time</th>
              <th className="py-2.5 pr-4 font-medium">Status</th>
              <th className="py-2.5 pl-0 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="text-ink">
                <td className="py-3 pr-4 font-medium">
                  <div className="flex items-center gap-2">
                    #{order.id}
                    {order.id === oldestPendingId && <NextBadge />}
                  </div>
                </td>
                <td className="py-3 pr-4 text-gray-600">{order.customer.name}</td>
                <td className="py-3 pr-4 text-gray-600">Table {order.table.number}</td>
                <td className="py-3 pr-4 text-gray-500">{getOrderItemCount(order)} items</td>
                <td className="py-3 pr-4 font-medium">{formatFCFA(order.total)}</td>
                <td className="py-3 pr-4 text-gray-500">{formatOrderTime(order.createdAt)}</td>
                <td className="py-3 pr-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="py-3 pl-0">
                  <ViewButton onClick={() => onView(order)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 sm:hidden">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border border-gray-100 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-ink">#{order.id}</p>
                  {order.id === oldestPendingId && <NextBadge />}
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  {order.customer.name} · Table {order.table.number}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {getOrderItemCount(order)} items · {formatOrderTime(order.createdAt)}
              </span>
              <span className="font-semibold text-ink">{formatFCFA(order.total)}</span>
            </div>

            <button
              type="button"
              onClick={() => onView(order)}
              className="mt-3 w-full rounded-lg bg-surface-muted py-2 text-sm font-medium text-ink hover:bg-gray-100"
            >
              View details
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
