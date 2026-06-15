import { httpGet } from "../../../shared/services/httpClient";
import type { Movie } from "../types/movie";

// لایه سرویس فیلم — فقط مسئول واکشی داده فیلم‌هاست
export const movieService = {
  getMovies(): Promise<Movie[]> {
    return httpGet<Movie[]>("/movies");
  },
};
