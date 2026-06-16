import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import type { Filters } from '@/pages/movies/types/filters';


export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<Filters>(() => {
    return {
      search: searchParams.get('search') || '',
      genres: searchParams.get('genres')?.split(',').filter(Boolean) || [],
      minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : null,
      yearFrom: searchParams.get('yearFrom') ? Number(searchParams.get('yearFrom')) : null,
      yearTo: searchParams.get('yearTo') ? Number(searchParams.get('yearTo')) : null,
      status: (searchParams.get('status') as Filters['status']) || 'all',
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (newFilters: Partial<Filters>) => {
      const params = new URLSearchParams(searchParams);

      if (newFilters.search !== undefined) {
        if (newFilters.search) params.set('search', newFilters.search);
        else params.delete('search');
      }
      if (newFilters.genres) {
        if (newFilters.genres.length) params.set('genres', newFilters.genres.join(','));
        else params.delete('genres');
      }
      if (newFilters.minRating !== undefined) {
        if (newFilters.minRating) params.set('minRating', String(newFilters.minRating));
        else params.delete('minRating');
      }
      if (newFilters.yearFrom !== undefined) {
        if (newFilters.yearFrom) params.set('yearFrom', String(newFilters.yearFrom));
        else params.delete('yearFrom');
      }
      if (newFilters.yearTo !== undefined) {
        if (newFilters.yearTo) params.set('yearTo', String(newFilters.yearTo));
        else params.delete('yearTo');
      }
      if (newFilters.status !== undefined) {
        if (newFilters.status === 'all') params.delete('status');
        else params.set('status', newFilters.status);
      }

      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return { filters, setFilters, resetFilters };
}