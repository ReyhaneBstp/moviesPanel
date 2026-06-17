export interface MovieModel {
  id: string;
  title: string;
  poster: string;
  year: string;
  country: string;
  imdb_rating: string;
  genres: string[];
  images: string[];
  is_active: boolean;
}
