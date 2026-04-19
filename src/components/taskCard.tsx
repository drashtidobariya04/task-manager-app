'use client';

import Link from 'next/link';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Link href={`/tasks/${task.id}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-xl mb-3 border border-gray-100 dark:border-gray-700 p-4 hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-gray-900 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-gray-700 dark:text-gray-200 flex-1 leading-relaxed font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            {task.title}
          </p>
          <span
            className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${task.completed
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800'
              }`}
          >
            {task.completed ? '✓ Done' : '● Pending'}
          </span>
        </div>
        <p className="mt-2.5 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <span className="inline-block w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-600 text-center leading-4 text-gray-500 dark:text-gray-400 text-[9px] font-bold">
            {task.userId}
          </span>
          User {task.userId}
        </p>
      </div>
    </Link>
  );
}