'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { ApiTask, LocalTask } from '@/types/task';
import TaskSkeleton from '@/components/taskSkeleton';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

async function fetchTaskById(id: string): Promise<ApiTask> {
  const { data } = await apiClient.get<ApiTask>(`/todos/${id}`);
  return data;
}

const TaskDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const localTask = useSelector((state: RootState) =>
    state.tasks.localTasks.find((t: LocalTask) => t.id === Number(id))
  );
  const { data: apiTask, isLoading, isError } = useQuery({
    queryKey: ['tasks', id],
    queryFn: () => fetchTaskById(id),
    enabled: !!id && !localTask,
  });

  const task = localTask ?? apiTask;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-5 w-28 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
        <TaskSkeleton />
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <p className="text-base font-semibold text-gray-800 dark:text-gray-200">Failed to load task</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 mb-4">The task may not exist or there was a network error.</p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6 font-medium transition-colors group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to tasks
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-snug">
            {task.title}
          </h1>
          <span
            className={`shrink-0 text-sm font-semibold px-3 py-1.5 rounded-full ${
              task.completed
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800'
            }`}
          >
            {task.completed ? '✓ Completed' : '● Pending'}
          </span>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Task ID</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">#{task.id}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Assigned To</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">User {task.userId}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Status</p>
            <p className={`text-sm font-semibold ${task.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
              {task.completed ? 'Completed' : 'Pending'}
            </p>
          </div>
          {('isLocal' in task) && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-blue-400 dark:text-blue-500 uppercase tracking-wider mb-0.5">Source</p>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">Local task</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;