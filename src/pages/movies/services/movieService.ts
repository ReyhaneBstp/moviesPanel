import { httpPatch, httpGet } from '@/shared/services/httpClient';
import type { Movie } from '@/pages/movies/types/movie';

export const movieService = {
  getMovies(): Promise<Movie[]> {
    return httpGet<Movie[]>("/movies");
  },
  updateMovie(id: string, data: Partial<Movie>): Promise<Movie> {
    return httpPatch<Movie>(`/movies/${id}`, data);
  },
};