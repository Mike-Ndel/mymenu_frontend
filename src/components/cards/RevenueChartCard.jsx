import { useState } from 'react';
import Card from '../ui/Card';
import { formatFCFA } from '../../utils/formatCurrency';

export default function RevenueChartCard({ data, title = 'Revenue Overview', description }) {
  const [activeIndex, setActiveIndex] = useState(data.length - 1);
  const maxAmount = Math.max(...data.map((d) => d.amount), 1);
  const active = data[activeIndex];

  return (
    <Card
      title={title}
      description={description}
      actions={
        active && (
          <div className="text-right">
            <p className="text-lg font-bold text-ink">{formatFCFA(active.amount)}</p>
            <p className="text-xs text-gray-400">{active.date}</p>
          </div>
        )
      }
    >
      <div className="flex h-52 items-end gap-2 sm:gap-4">
        {data.map((point, index) => {
          const heightPercent = Math.max((point.amount / maxAmount) * 100, 4);
          const isActive = index === activeIndex;

          return (
            <button
              key={point.date}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
              aria-label={`${point.day}, ${point.date}: ${formatFCFA(point.amount)}`}
            >
              <div className="flex h-full w-full items-end">
                <div
                  className={`w-full rounded-t-md transition-all ${
                    isActive ? 'bg-primary' : 'bg-primary/25 group-hover:bg-primary/50'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-ink' : 'text-gray-400'
                }`}
              >
                {point.day}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
