import { create } from 'zustand';
import type { Movie } from '../types/movie';


interface MovieStore {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  fetched: boolean;
  setMovies: (movies: Movie[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFetched: () => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  isLoading: true,
  error: null,
  fetched: false,
  setMovies: (movies) => set({ movies, isLoading: false, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),
  setFetched: () => set({ fetched: true }),
}));