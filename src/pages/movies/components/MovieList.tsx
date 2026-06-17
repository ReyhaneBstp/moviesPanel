import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MovieRow } from "./MovieRow";
import type { MovieModel } from "@/pages/movies/types/movie";
import EmptyState from "@/shared/components/EmptyState";

const ESTIMATED_ROW_HEIGHT = 100;

interface MovieListProps {
  movies: MovieModel[];
}

export function MovieList({ movies }: MovieListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: movies.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: 2,
  });

  if (movies.length === 0) {
    return <EmptyState />;
  }

  return (
    <div ref={parentRef} className="custom-scrollbar h-[70vh] overflow-auto overflow-x-hidden">
      <div
        className="relative w-full"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const movie = movies[virtualRow.index];
          return (
            <div
              key={movie.id}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              className="absolute right-0 top-0 w-full px-2 sm:px-4 py-2"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <MovieRow movie={movie} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
