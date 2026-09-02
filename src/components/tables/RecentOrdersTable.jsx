import { ClipboardList } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import EmptyState from '../ui/EmptyState';
import { formatFCFA } from '../../utils/formatCurrency';
import { formatOrderTime } from '../../utils/date';

export default function RecentOrdersTable({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No orders yet today"
        description="New orders placed by customers will show up here."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
            <th className="py-2.5 pr-4 font-medium">Order ID</th>
            <th className="py-2.5 pr-4 font-medium">Customer</th>
            <th className="py-2.5 pr-4 font-medium">Table</th>
            <th className="py-2.5 pr-4 font-medium">Total</th>
            <th className="py-2.5 pr-4 font-medium">Time</th>
            <th className="py-2.5 pl-0 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order) => (
            <tr key={order.id} className="text-ink">
              <td className="py-3 pr-4 font-medium">#{order.id}</td>
              <td className="py-3 pr-4 text-gray-600">{order.customer.name}</td>
              <td className="py-3 pr-4 text-gray-600">Table {order.table.number}</td>
              <td className="py-3 pr-4 font-medium">{formatFCFA(order.total)}</td>
              <td className="py-3 pr-4 text-gray-500">{formatOrderTime(order.createdAt)}</td>
              <td className="py-3 pl-0">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
