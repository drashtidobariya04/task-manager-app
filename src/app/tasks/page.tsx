'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { FilterStatus, Task } from '@/types/task';
import TaskCard from '@/components/taskCard';
import SearchBar from '@/components/searchBar';
import FilterBar from '@/components/filterBar';
import TaskSkeleton from '@/components/taskSkeleton';
import TaskForm from '@/components/taskForm';
import Pagination from '@/components/pagination';
import ThemeToggle from '@/components/themeToggle';


const TasksPage = () => {
  const { tasks, isLoading, isError } = useTasks();
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const TASKS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    setCurrentPage(1);
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

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * TASKS_PER_PAGE;
    return filteredTasks.slice(start, start + TASKS_PER_PAGE);
  }, [filteredTasks, currentPage]);

  const completedCount = tasks.filter((t: Task) => t.completed).length;
  const pendingCount = tasks.filter((t: Task) => !t.completed).length;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            My Tasks
          </h1>
          {!isLoading && !isError && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {completedCount} done · {pendingCount} pending
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-200 dark:shadow-blue-900/50 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">New Task</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-3">
        <SearchBar value={searchInput} onChange={handleSearchChange} />
      </div>

      {/* Filter pills */}
      <div className="mb-6">
        <FilterBar
          active={filter}
          onChange={(value) => { setFilter(value); setCurrentPage(1); }}
        />
      </div>

      {/* Error */}
      {isError && (
        <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          Failed to load tasks. Please refresh and try again.
        </div>
      )}

      {/* Task list */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => <TaskSkeleton key={i} />)}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-base font-semibold text-gray-700 dark:text-gray-300">No tasks found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="space-y-2">
          {paginatedTasks.map((task) => (
            <TaskCard key={`${('isLocal' in task ? 'local' : 'api')}-${task.id}`} task={task} />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </>
  );
};

export default TasksPage;