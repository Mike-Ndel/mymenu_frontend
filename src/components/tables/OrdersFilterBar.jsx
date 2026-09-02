import { Search, X } from 'lucide-react';
import { ORDER_STATUSES } from '../../utils/orderStatus';

const FILTERS = ['All', ...ORDER_STATUSES];

export default function OrdersFilterBar({ activeFilter, onFilterChange, searchTerm, onSearchChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-ink'
                  : 'bg-white text-gray-500 ring-1 ring-inset ring-gray-200 hover:text-ink'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="relative w-full sm:w-72">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search order ID, customer, table..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-8 text-sm text-ink placeholder:text-gray-400 focus:border-primary focus:outline-none"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ink"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
