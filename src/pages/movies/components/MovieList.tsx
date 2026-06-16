import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MovieRow } from "./MovieRow";
import type { Movie } from "@/pages/movies/types/movie";

interface MovieListProps {
  movies: Movie[];
}

export function MovieList({ movies }: MovieListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: movies.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 1,
  });

  if (movies.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        <p className="text-sm">هیچ نتیجه‌ای یافت نشد</p>
      </div>
    );
  }

  return (
    <div ref={parentRef} className="h-[70vh] overflow-auto custom-scrollbar">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const movie = movies[virtualRow.index];
          return (
            <div
              key={movie.id}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100%",
                height: `80px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="px-4 py-1"
            >
              <MovieRow movie={movie} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
