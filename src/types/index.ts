export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieList = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export interface MovieDetails extends Movie {
  belongs_to_collection: any[];
  budget: number;
  genres: any[];
  homepage: string;
  imdb_id: string;
  production_companies: any[];
  production_countries: any[];
  revenue: number;
  runtime: number;
  spoken_languages: any[];
  status: string;
  tagline: string;
}
