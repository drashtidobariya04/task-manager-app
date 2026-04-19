export default function TaskSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-gray-100 dark:bg-gray-700 rounded-full w-3/4" />
          <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full w-1/2" />
        </div>
        <div className="h-6 w-16 bg-gray-100 dark:bg-gray-700 rounded-full shrink-0" />
      </div>
      <div className="mt-3 h-3 w-20 bg-gray-100 dark:bg-gray-700 rounded-full" />
    </div>
  );
} 