import { useGetMovies } from "./hooks/useGetMovies";
import { useUrlFilters } from "./hooks/useUrlFilters";
import { useFilteredMovies } from "./hooks/useFilteredMovies";
import { useMovieStore } from "./store/movieStore";

import { SearchBar } from "./components/SearchBar";
import { FilterPanel } from "./components/FilterPanel";
import { MovieList } from "./components/MovieList";
import { BulkActionBar } from "./components/BulkActionBar";
import ErrorState from "../../shared/components/ErrorState";
import MovieListSkeleton from "./components/MovieSkeleton";

export default function MoviesPage() {
  const { movies, isLoading, error, refetch } = useGetMovies();
  const { filters } = useUrlFilters();
  const filteredMovies = useFilteredMovies(movies, filters);
  const { selectedMovieIdsForBulk } = useMovieStore();

  const hasBulkSelection = selectedMovieIdsForBulk.length > 0;

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-6" dir="rtl">
      <div className="flex flex-wrap items-center gap-3">
        <SearchBar />
        <FilterPanel />
        {hasBulkSelection && <BulkActionBar />}
      </div>

      {error ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : (
        <main className="fade-in rounded-3xl border border-white/30 bg-white/60 p-4 shadow-2xl backdrop-blur-md">
          {isLoading ? (
            <MovieListSkeleton />
          ) : (
            <MovieList movies={filteredMovies} />
          )}
        </main>
      )}
    </div>
  );
}
