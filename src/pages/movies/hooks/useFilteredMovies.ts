import { useMemo } from 'react';
import type { MovieModel } from '@/pages/movies/types/movie';
import type { FiltersModel } from '@/pages/movies/types/filters';


export function useFilteredMovies(movies: MovieModel[], filters: FiltersModel) {
  return useMemo(() => {
    let result = [...movies];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter((m) => m.title.toLowerCase().includes(q));
    }

    if (filters.genres.length > 0) {
      result = result.filter((m) => m.genres.some((g) => filters.genres.includes(g)));
    }

    if (filters.minRating !== null) {
      result = result.filter((m) => parseFloat(m.imdb_rating) >= filters.minRating!);
    }

    if (filters.yearFrom !== null) {
      result = result.filter((m) => parseInt(m.year) >= filters.yearFrom!);
    }
    if (filters.yearTo !== null) {
      result = result.filter((m) => parseInt(m.year) <= filters.yearTo!);
    }

    if (filters.status === 'active') {
      result = result.filter((m) => m.is_active);
    } else if (filters.status === 'deactive') {
      result = result.filter((m) => !m.is_active);
    }

    return result;
  }, [movies, filters]);
}