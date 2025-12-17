import { MovieFilter } from "./MovieFilter";
import { MovieEntry } from "./MovieEntry";
import { useState, useMemo } from "react";

interface Props {
  movies: {
    id: string;
    category: string;
    pubDate: Date;
    title: string;
    overview: string;
    releaseDate: string;
    genres: Array<string>;
    poster: string;
    directors: Array<string>;
    casts: Array<string>;
  }[];
}

export const MoviePageContent = ({ movies }: Props) => {
  const [activeGenres, setActiveGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setActiveGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const resetGenres = () => setActiveGenres([]);

  const filteredMovies = useMemo(() => {
    if (activeGenres.length === 0) return movies;

    return movies.filter((movie) =>
      activeGenres.some((genre) => movie.genres.includes(genre)),
    );
  }, [movies, activeGenres]);

  return (
    <>
      <MovieFilter
        genres={[...new Set(movies.flatMap((movie) => movie.genres))]}
        total={filteredMovies.length}
        activeGenres={activeGenres}
        onToggleGenre={toggleGenre}
        onReset={resetGenres}
      />

      <ul className="spacing-y-article flex flex-col">
        {filteredMovies.map((movie) => (
          <MovieEntry key={movie.id} movie={movie} />
        ))}
      </ul>
    </>
  );
};
