export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface Cast {
  adult: false;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieProps {
  imdbId: string;
  category: string;
  title: string;
  overview: string;
  releaseDate: string;
  poster: string;
  director: string;
  casts: Array<string>;
  genres: Array<string>;
  slug: string;
  publishedDate: Date;
  body: string;
}

export interface MovieMDX {
  content: string;
  category: string;
  imdbId: string;
  publishedDate: Date;
  _meta: {
    filePath: string;
    fileName: string;
    directory: string;
    extension: string;
    path: string;
  };
  body: string;
  slug: string;
}

export interface Track {
  id: string;
  name: string;
  artists: {
    name: string;
  }[];
  album: {
    name: string;
    images: {
      height: number;
      width: number;
      url: string;
    }[];
  };
  external_urls: {
    spotify: string;
  };
}
