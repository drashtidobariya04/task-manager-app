export default function TaskSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="h-5 w-16 bg-gray-200 rounded-full shrink-0" />
      </div>
      <div className="mt-3 h-3 w-16 bg-gray-200 rounded" />
    </div>
  );
}