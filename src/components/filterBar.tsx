'use client';

import { FilterStatus } from '@/types/task';

interface FilterBarProps {
  active: FilterStatus;
  onChange: (status: FilterStatus) => void;
}

const filters: { label: string; value: FilterStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
];

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}