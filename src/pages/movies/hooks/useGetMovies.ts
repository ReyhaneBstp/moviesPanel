import { useEffect, useCallback } from 'react';
import { movieService } from '../services/movieService';
import { useMovieStore } from '../store/movieStore';

export function useGetMovies() {
  const { movies, isLoading, error, fetched, setMovies, setLoading, setError, setFetched } =
    useMovieStore();

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
        console.error(err)
        setError('خطا در دریافت فیلم‌ها');
        setLoading(false); 
      });
  }, [setMovies, setLoading, setError, setFetched]);

  useEffect(() => {
    if (fetched) return;
    fetchMovies();
  }, [fetched, fetchMovies]);

  return { movies, isLoading, error, refetch: fetchMovies };
}