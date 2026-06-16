import { create } from "zustand";
import type { Movie } from '@/pages/movies/types/movie';

interface MovieState {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  fetched: boolean;
  setMovies: (movies: Movie[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFetched: () => void;
  updateMovie: (updated: Movie) => void; 
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  isLoading: false,
  error: null,
  fetched: false,
  setMovies: (movies) => set({ movies, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  setFetched: () => set({ fetched: true }),
  updateMovie: (updated) =>
    set((state) => ({
      movies: state.movies.map((m) => (m.id === updated.id ? updated : m)),
    })),
}));