import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ icon: Icon, label, value, changePercent, trend, accent = 'yellow' }) {
  const isUp = trend === 'up';
  const accentStyles = {
    yellow: 'bg-primary/15 text-ink',
    black: 'bg-ink text-white',
  };

  return (
    <div className="rounded-card bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentStyles[accent]}`}>
          <Icon size={18} strokeWidth={2} />
        </span>

        {typeof changePercent === 'number' && (
          <span
            className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
              isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}
          >
            {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(changePercent)}%
          </span>
        )}
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
      {typeof changePercent === 'number' && (
        <p className="mt-2 text-xs text-gray-400">vs. yesterday</p>
      )}
    </div>
  );
}
