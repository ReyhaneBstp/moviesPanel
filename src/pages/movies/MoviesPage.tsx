
import { useUrlFilters } from "./hooks/useUrlFilters";
import { useFilteredMovies } from "./hooks/useFilteredMovies";
import { SearchBar } from "./components/SearchBar";
import { FilterPanel } from "./components/FilterPanel";
import { MovieList } from "./components/MovieList";
import { useGetMovies } from "./hooks/useGetMovies";

export default function MoviesPage() {
  const { movies, isLoading, error } = useGetMovies();
  const { filters } = useUrlFilters();
  const filteredMovies = useFilteredMovies(movies, filters);

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-6" dir="rtl">
      <div className="flex flex-wrap items-center gap-3">
        <SearchBar />
        <FilterPanel />
      </div>

      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-500" />
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-red-50 p-6 text-center text-red-600 border border-red-100">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <main className="fade-in rounded-3xl border border-white/30 bg-white/60 p-4 shadow-2xl backdrop-blur-md">
          <MovieList movies={filteredMovies} />
        </main>
      )}
    </div>
  );
}
