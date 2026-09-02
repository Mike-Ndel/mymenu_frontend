import { UtensilsCrossed } from 'lucide-react';
import Card from '../ui/Card';
import EmptyState from '../ui/EmptyState';
import { formatFCFA } from '../../utils/formatCurrency';

export default function PopularItemsCard({ items = [] }) {
  return (
    <Card title="Popular Menu Items" description="Best sellers today">
      {items.length === 0 ? (
        <EmptyState
          icon={UtensilsCrossed}
          title="No sales yet"
          description="Your top-selling menu items will appear here once orders come in."
        />
      ) : (
        <ul className="divide-y divide-gray-50">
          {items.map((item, index) => (
            <li key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <span className="w-4 shrink-0 text-xs font-medium text-gray-300">
                {index + 1}
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-lg">
                {item.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                <p className="text-xs text-gray-400">{item.ordersSold} orders</p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-ink">
                {formatFCFA(item.revenue)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
