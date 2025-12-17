interface Props {
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
}

export const MovieEntry = ({ movie }: { movie: Props }) => {
  const {
    id,
    category,
    pubDate,
    title,
    overview,
    releaseDate,
    genres,
    poster,
    directors,
    casts,
  } = movie;

  return (
    <li id="movie-entry" data-genre={genres.join(", ")}>
      <a
        href={`/movies/${id}`}
        className="spacing-y-densest group flex flex-col md:grid md:grid-cols-12"
      >
        <time
          dateTime={pubDate.toLocaleDateString()}
          className="group-hover:text-primary col-span-3 transition-all duration-300 ease-in-out md:col-span-2"
        >
          {pubDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
        <div className="spacing-y-densest flex flex-col md:col-span-10">
          <p className="group-hover:text-primary transition-all duration-300 ease-in-out">
            {genres.map(String).join(", ")}
          </p>
          <h2 className="group-hover:text-primary text-base leading-[1.6] transition-all duration-300 ease-in-out">
            {title} (
            <time
              dateTime={new Date(releaseDate).toLocaleDateString()}
              className="text-secondary-emphasize group-hover:text-primary transition-all duration-300 ease-in-out"
            >
              {new Date(releaseDate).getFullYear()}
            </time>
            )
          </h2>
          <div
            id="movie-poster"
            style={{
              backgroundImage: `url("${poster}")`,
              backgroundSize: "cover",
            }}
            className={`absolute z-20 hidden h-[150px] w-[100px] scale-[0.4] transform rounded opacity-0 md:block`}
          ></div>
        </div>
      </a>
    </li>
  );
};
