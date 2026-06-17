import { httpGet, httpPatch } from '@/shared/services/httpClient';
import type { MovieModel } from '@/pages/movies/types/movie';

const BASE_URL = "/api";

async function httpPost<T>(endpoint: string, body: any): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`خطا (${response.status})`);
  return response.json() as Promise<T>;
}

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