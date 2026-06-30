import { httpGet, httpPatch, httpPost } from '@/shared/services/httpClient';
import type { MovieModel } from '@/pages/movies/types/movie';

export const movieService = {
  getMovies(): Promise<MovieModel[]> {
    return httpGet<MovieModel[]>("/movies");
  },
  editMovieData(id: string, data: Partial<MovieModel>): Promise<MovieModel> {
    return httpPatch<MovieModel>(`/movies/${id}`, data);
  },
  bulkActivate(ids: string[]): Promise<void> {
    return httpPatch<void>("/movies/bulk/activate", { ids });
  },
  bulkDeactivate(ids: string[]): Promise<void> {
    return httpPatch<void>("/movies/bulk/deactivate", { ids });
  },
  bulkDelete(ids: string[]): Promise<void> {
    return httpPost<void>("/movies/bulk/delete", { ids });
  },
};