import { useEffect, useCallback } from 'react';
import { movieService } from '@/pages/movies/services/movieService';
import { useMovieStore } from '@/pages/movies/store/movieStore';
import { useGlobalStore } from '@/shared/store/useGlobalStore';

export function useGetMovies() {
  const { movies, isLoading, error, fetched, setMovies, setLoading, setError, setFetched } =
    useMovieStore();
  const { showSnackbar } = useGlobalStore();

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
        const errorMessage = err.message || 'خطا در دریافت فیلم‌ها';
        setError(errorMessage);
        showSnackbar(errorMessage, 'error');
        setLoading(false); 
      });
  }, [setMovies, setLoading, setError, setFetched, showSnackbar]);

  useEffect(() => {
    if (fetched) return;
    fetchMovies();
  }, [fetched, fetchMovies]);

  return { movies, isLoading, error, refetch: fetchMovies };
}
