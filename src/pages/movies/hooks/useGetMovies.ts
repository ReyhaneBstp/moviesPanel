import { useEffect, useState, useCallback } from "react";
import { movieService } from "@/pages/movies/services/movieService";
import { useMovieStore } from "@/pages/movies/store/movieStore";
import { useGlobalStore } from "@/shared/store/useGlobalStore";

export function useGetMovies() {
  const { movies, fetched, setMovies, setFetched } = useMovieStore();
  const { showSnackbar } = useGlobalStore();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(() => {
    setLoading(true);
    setError(null);

    movieService
      .getMovies()
      .then((data) => {
        setMovies(data);
        setFetched();
      })
      .catch((err) => {
        const errorMessage = err?.message || "خطا در دریافت فیلم‌ها";
        setError(errorMessage);
        showSnackbar(errorMessage, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setMovies, setFetched, showSnackbar]);

  useEffect(() => {
    if (!fetched) {
      fetchMovies();
    }
  }, [fetched, fetchMovies]);

  return { movies, isLoading, error, refetch: fetchMovies };
}
