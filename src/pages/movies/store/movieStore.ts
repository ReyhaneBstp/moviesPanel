import { create } from "zustand";
import type { Movie } from '@/pages/movies/types/movie';

interface MovieState {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  fetched: boolean;
  selectedMovieIdsForBulk: string[];  
  setMovies: (movies: Movie[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFetched: () => void;
  updateMovie: (updated: Movie) => void;
  setMultipleMoviesActiveStatus: (ids: string[], isActive: boolean) => void;
  deleteMultipleMovies: (ids: string[]) => void;
  toggleMovieBulkSelection: (id: string) => void;
  clearBulkMovieSelection: () => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  isLoading: false,
  error: null,
  fetched: false,
  selectedMovieIdsForBulk: [],        

  setMovies: (movies) => set({ movies, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  setFetched: () => set({ fetched: true }),

  updateMovie: (updated) =>
    set((state) => ({
      movies: state.movies.map((m) => (m.id === updated.id ? updated : m)),
    })),

  setMultipleMoviesActiveStatus: (ids, isActive) =>
    set((state) => ({
      movies: state.movies.map((m) =>
        ids.includes(m.id) ? { ...m, is_active: isActive } : m
      ),
    })),

  deleteMultipleMovies: (ids) =>
    set((state) => ({
      movies: state.movies.filter((m) => !ids.includes(m.id)),
      selectedMovieIdsForBulk: state.selectedMovieIdsForBulk.filter(
        (id) => !ids.includes(id)
      ),
    })),

  toggleMovieBulkSelection: (id) =>
    set((state) => {
      const alreadySelected = state.selectedMovieIdsForBulk.includes(id);
      return {
        selectedMovieIdsForBulk: alreadySelected
          ? state.selectedMovieIdsForBulk.filter((i) => i !== id)
          : [...state.selectedMovieIdsForBulk, id],
      };
    }),

  clearBulkMovieSelection: () => set({ selectedMovieIdsForBulk: [] }),
}));