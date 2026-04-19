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
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        <TaskSkeleton />
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-medium">Failed to load task.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          ← Go back
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="text-sm text-blue-600 hover:underline mb-6 block"
      >
        ← Back to tasks
      </button>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-xl font-semibold text-gray-900 leading-snug">
            {task.title}
          </h1>
          <span
            className={`shrink-0 text-sm font-medium px-3 py-1 rounded-full ${task.completed
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
              }`}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>

        <div className="text-sm text-gray-500 space-y-1">
          <p>Task ID: <span className="text-gray-700">{task.id}</span></p>
          <p>Assigned to: <span className="text-gray-700">User {task.userId}</span></p>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage