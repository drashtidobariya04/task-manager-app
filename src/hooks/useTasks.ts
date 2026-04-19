import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import apiClient from '@/lib/axios';
import { ApiTask, Task } from '@/types/task';
import { RootState } from '@/store';

async function fetchTasks(): Promise<ApiTask[]> {
  const { data } = await apiClient.get<ApiTask[]>('/todos');
  return data;
}

export function useTasks() {
  const localTasks = useSelector((state: RootState) => state.tasks.localTasks);

  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const allTasks: Task[] = [
    ...localTasks,
    ...(query.data ?? []),
  ];

  return {
    tasks: allTasks,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
  };
}