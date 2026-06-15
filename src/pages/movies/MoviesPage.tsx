import { useMovies } from "./hooks/useMovies";
import { DashboardHeader } from "./components/DashboardHeader";
import { MovieList } from "./components/MovieList";

export default function MoviesPage() {
  const { data, isLoading, error } = useMovies();

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-8" dir="rtl">
      <DashboardHeader count={data.length} />

      {isLoading && (
        <div className="flex h-64 items-center justify-center text-primary">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-red-50 p-6 text-center text-red-600 border border-red-100">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <main className="fade-in">
          <MovieList movies={data} />
        </main>
      )}
    </div>
  );
}
