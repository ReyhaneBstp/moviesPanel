import { httpGet } from "../../../shared/services/httpClient";
import type { Movie } from "../types/movie";

export const movieService = {
  getMovies(): Promise<Movie[]> {
    return httpGet<Movie[]>("/movies");
  },
};
