import { useEffect, useState, useCallback } from "react";
import { movieService } from "../services/movieService";
import type { MoviesState } from "../types/movie";

export function useMovies() {
  const [state, setState] = useState<MoviesState>({
    data: [],
    isLoading: true,
    error: null,
  });

  const fetchMovies = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const movies = await movieService.getMovies();
      setState({ data: movies, isLoading: false, error: null });
    } catch (err) {
      setState({
        data: [],
        isLoading: false,
        error: err instanceof Error ? err.message : "خطای ناشناخته",
      });
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { ...state, refetch: fetchMovies };
}
