'use client';

import { FilterStatus } from '@/types/task';

interface FilterBarProps {
  active: FilterStatus;
  onChange: (status: FilterStatus) => void;
}

const filters: { label: string; value: FilterStatus; emoji: string }[] = [
  { label: 'All', value: 'all', emoji: '◈' },
  { label: 'Completed', value: 'completed', emoji: '✓' },
  { label: 'Pending', value: 'pending', emoji: '●' },
];

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
            active === filter.value
              ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md shadow-blue-200 dark:shadow-blue-900 scale-105'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <span className="text-xs">{filter.emoji}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
}