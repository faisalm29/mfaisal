import { GenreBadge } from "./GenreBadge";
import { ResetGenreBadge } from "./ResetGenreBadge";
import { MovieCounter } from "./MovieCounter";

interface Props {
  genres: string[];
  total: number;
  activeGenres: string[];
  onToggleGenre: (genre: string) => void;
  onReset: () => void;
}

export const MovieFilter = ({
  genres,
  total,
  activeGenres,
  onToggleGenre,
  onReset,
}: Props) => {
  return (
    <>
      <p>Is there any genre you like?</p>
      <ul className="flex flex-wrap gap-2">
        {genres.map((genre) => {
          const isActive = activeGenres.includes(genre);

          return (
            <GenreBadge
              key={genre}
              genre={genre}
              onToggleGenre={onToggleGenre}
              isActive={isActive}
            />
          );
        })}

        {/* reset filter badge */}
        {activeGenres.length > 0 && <ResetGenreBadge onReset={onReset} />}
      </ul>
      <MovieCounter total={total} />
    </>
  );
};
