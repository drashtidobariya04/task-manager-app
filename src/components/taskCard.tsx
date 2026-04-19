'use client';

import Link from 'next/link';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Link href={`/tasks/${task.id}`}>
      <div className="bg-white rounded-lg mb-3 border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-gray-800 flex-1 leading-relaxed">
            {task.title}
          </p>
          <span
            className={`shrink-0 text-xs font-medium px-2 py-1 rounded-full ${
              task.completed
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        <p className="mt-2 text-xs text-gray-400">User {task.userId}</p>
      </div>
    </Link>
  );
}