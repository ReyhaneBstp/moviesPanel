import { useMemo } from 'react';
import type { Movie } from '../types/movie';
import type { Filters } from '../types/filters';


export function useFilteredMovies(movies: Movie[], filters: Filters) {
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

    if (filters.status === 'published') {
      result = result.filter((m) => m.is_published);
    } else if (filters.status === 'draft') {
      result = result.filter((m) => !m.is_published);
    }

    return result;
  }, [movies, filters]);
}