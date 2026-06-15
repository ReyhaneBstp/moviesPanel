import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MovieCard } from "./MovieCard";
import type { Movie } from "../types/movie";

interface MovieListProps {
  movies: Movie[];
}

export function MovieList({ movies }: MovieListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: movies.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 112,
    overscan: 6, 
  });

  return (
    <div
      ref={parentRef}
      className="h-[70vh] overflow-auto rounded-3xl px-1
                 [scrollbar-width:thin]"
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
              className="px-1 py-1.5"
            >
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
