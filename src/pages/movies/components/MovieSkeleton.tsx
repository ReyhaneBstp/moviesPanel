const SKELETON_COUNT = 8;

export default function MovieListSkeleton() {
    return (
      <div className="space-y-3 h-[70vh] overflow-hidden">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <MovieRowSkeleton key={i} />
        ))}
      </div>
    );
  }

  
function MovieRowSkeleton() {
  return (
    <div className="px-4 py-1">

    <div className="flex items-center gap-3 card animate-pulse">
      <div className="flex-shrink-0 w-4 h-4 ml-2 rounded bg-gray-200" />
      <div className="h-14 w-10 flex-shrink-0 rounded-xl bg-gray-200" />

      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 w-3/5 bg-gray-200 rounded" />
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <div className="h-3 w-10 bg-gray-200 rounded" />
          <div className="h-3 w-12 bg-gray-200 rounded" />
          <div className="flex gap-1">
            <div className="h-4 w-12 rounded-full bg-gray-200" />
            <div className="h-4 w-12 rounded-full bg-gray-200" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-200 rounded" />
            <div className="h-3 w-6 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 h-6 w-16 rounded-full bg-gray-200" />
      <div className="flex-shrink-0 p-2">
        <div className="h-4 w-4 bg-gray-200 rounded" />
      </div>
    </div>
    </div>
  );
}

