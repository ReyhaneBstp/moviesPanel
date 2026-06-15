import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Movie } from "../types/movie";
import { MovieRow } from "./MovieRow";

interface MovieListProps {
  movies: Movie[];
}

export function MovieList({ movies }: MovieListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: movies.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, 
    overscan: 3,
  });

  return (
    <div
      ref={parentRef}
      className="h-[75vh] overflow-auto scrollbar-thin"
      style={{ scrollbarWidth: "thin" }}
    >
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
                height: `${virtualRow.size}px`,
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