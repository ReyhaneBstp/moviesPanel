const SKELETON_COUNT = 8;

export default function MovieListSkeleton() {
  return (
    <div className="space-y-4 h-[70vh] overflow-hidden px-2 sm:px-4 py-2">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <MovieRowSkeleton key={i} />
      ))}
    </div>
  );
}

function MovieRowSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 card p-3 sm:p-2 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-4 h-4 rounded bg-gray-200" />
        <div className="h-16 w-12 sm:h-14 sm:w-10 flex-shrink-0 rounded-xl bg-gray-200" />
        <div className="flex-1 sm:hidden space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-3 w-10 bg-gray-200 rounded" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0 space-y-2 mt-2 sm:mt-0">
        <div className="hidden sm:block h-4 w-1/3 bg-gray-200 rounded" />
        <div className="flex flex-wrap gap-2">
          <div className="h-3 w-10 bg-gray-200 rounded" />
          <div className="h-3 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-12 rounded-full bg-gray-200" />
        </div>
      </div>

      <div className="flex justify-between items-center sm:justify-end gap-2 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t border-gray-100 sm:border-0">
        <div className="h-6 w-16 rounded-lg bg-gray-200" />
        <div className="h-8 w-8 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}