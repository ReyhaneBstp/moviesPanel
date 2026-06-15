import { useEffect } from 'react';
import { movieService } from '../services/movieService';
import { useMovieStore } from '../store/movieStore';

export function useGetMovies() {
  const { movies, isLoading, error, fetched, setMovies, setLoading, setError, setFetched } =
    useMovieStore();

  useEffect(() => {
    if (fetched) return; 
    setLoading(true);
    movieService
      .getMovies()
      .then((data) => {
        setMovies(data);
        setFetched();
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'خطا در دریافت فیلم‌ها');
      });
  }, [fetched]);

  return { movies, isLoading, error };
}