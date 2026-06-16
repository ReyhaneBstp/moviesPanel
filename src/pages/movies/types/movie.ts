
export interface Movie {
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
  
  export interface MoviesState {
    data: Movie[];
    isLoading: boolean;
    error: string | null;
  }
  