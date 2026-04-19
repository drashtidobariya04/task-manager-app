'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { FilterStatus, Task } from '@/types/task';
import TaskCard from '@/components/taskCard';
import SearchBar from '@/components/searchBar';
import FilterBar from '@/components/filterBar';
import TaskSkeleton from '@/components/taskSkeleton';
import TaskForm from '@/components/taskForm';

const TasksPage = ()=> {
  const { tasks, isLoading, isError } = useTasks();
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'completed' && task.completed) ||
        (filter === 'pending' && !task.completed);

      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, searchQuery]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          + New Task
        </button>
      </div>

      <div className="space-y-3 mb-6">
        <SearchBar value={searchInput} onChange={handleSearchChange} />
        <FilterBar active={filter} onChange={setFilter} />
      </div>

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
          Failed to load tasks. Please refresh and try again.
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <TaskSkeleton key={i} />
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No tasks found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskCard key={`${('isLocal' in task ? 'local' : 'api')}-${task.id}`} task={task} />
          ))}
        </div>
      )}

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default TasksPage