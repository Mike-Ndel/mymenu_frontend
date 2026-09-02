import { Link } from 'react-router-dom';
import { PlusCircle, ClipboardList, Grid2x2, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';

const actions = [
  { label: 'Add Menu Item', to: '/menu', icon: PlusCircle },
  { label: 'View Orders', to: '/orders', icon: ClipboardList },
  { label: 'Manage Tables', to: '/tables', icon: Grid2x2 },
];

export default function QuickActionsCard() {
  return (
    <Card title="Quick Actions">
      <div className="space-y-2">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className="flex items-center justify-between rounded-lg border border-gray-100 px-3.5 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:bg-primary/10"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-ink">
                <action.icon size={16} strokeWidth={2} />
              </span>
              {action.label}
            </span>
            <ChevronRight size={16} className="text-gray-300" />
          </Link>
        ))}
      </div>
    </Card>
  );
}
