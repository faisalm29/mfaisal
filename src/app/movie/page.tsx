import getMoviesByImdbIds from "../../../lib/tmdb";
import { allMovies } from "content-collections";
import Image from "next/image";
import Link from "next/link";

const Movie = async () => {
  const imdbIds = allMovies.map((movie) => movie.imdbId);

  const movies = await getMoviesByImdbIds(imdbIds);

  return (
    <>
      <h1>All Movies</h1>
      <ul>
        {movies.map((movie, id) => (
          <li key={id}>
            {/* title */}
            <h2>{movie.title}</h2>

            {/* poster */}
            {movie.poster && (
              <Image
                src={movie.poster}
                alt={movie.title}
                width={100}
                height={200}
              />
            )}

            {/* overview */}
            <p>{movie.overview}</p>

            {/* release date */}
            <time dateTime={movie.releaseDate}>{movie.releaseDate}</time>

            {/* director */}
            <p>{movie.director}</p>

            {/* top 5 casts */}
            <ul>
              {movie.casts.map((cast: string, id: string) => (
                <li key={id}>{cast}</li>
              ))}
            </ul>

            {/* Read more link */}
            {movie.slug && <Link href={movie.slug}>Read More →</Link>}
          </li>
        ))}
      </ul>
      {/* <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      {movie.poster && (
        <Image src={movie.poster} alt={movie.title} width={360} height={720} />
      )}
      <time dateTime={movie.releaseDate}>{movie.releaseDate}</time>
      <p>{movie.director}</p>
      <ul>
        {movie.cast.map((c: string, id: string) => (
          <li key={id}>{c}</li>
        ))}
      </ul> */}
    </>
  );
};

export default Movie;
