interface Props {
  total: number;
}

export const MovieCounter = ({ total }: Props) => {
  return (
    <p>
      Currently showing{" "}
      <span id="movie-total" className="text-secondary-emphasize">
        {total} movies
      </span>
      .
    </p>
  );
};
