interface Props {
  genre: string;
  onToggleGenre: (genre: string) => void;
  isActive: boolean;
}

export const GenreBadge = ({ genre, onToggleGenre, isActive }: Props) => {
  return (
    <li>
      <button
        id="badge"
        onClick={() => onToggleGenre(genre)}
        className={`block w-fit rounded-full px-4 py-0.5 ${isActive ? "bg-secondary-emphasize text-neutral" : "bg-tertiary-default text-secondary-default"}`}
      >
        {genre}
      </button>
    </li>
  );
};
