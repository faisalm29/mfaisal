import { getCollection } from "astro:content";

const TMDB_API_KEY = import.meta.env.TMDB_API_KEY;
// get data from local mdx movie content collections
const mdxMovieCollections = await getCollection("movies");

export async function getMovie(imdbId: string) {
  // get single movie based on its IMDB ID
  const res = await fetch(
    `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`,
  );
  if (!res.ok) throw new Error(`Failed to fetch movie for IMDB ID: ${imdbId}`);
  const data = await res.json();
  const movie = data.movie_results[0];
  if (!movie) return null;

  // get tmdbId to fetch movie details
  const tmdbId = movie.id;

  // fetch movie details
  const movieDetailsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}`,
  );
  if (!movieDetailsRes.ok) throw new Error("Failed to fetch movie details");
  const remoteMovieDetails = await movieDetailsRes.json();

  // fetch movie credits
  const movieCreditsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}`,
  );
  if (!movieCreditsRes.ok) throw new Error("Failed to fetch movie credits");
  const movieCredits = await movieCreditsRes.json();

  // get corresponding movie data from local mdx movie content collections
  const localMovieDetails = mdxMovieCollections.find(
    (movie) => movie.data.imdbId === imdbId,
  );

  if (!localMovieDetails) return null;

  return {
    id: localMovieDetails.id,
    category: localMovieDetails.data.category,
    pubDate: localMovieDetails.data.pubDate,
    title: remoteMovieDetails.title as string,
    overview: remoteMovieDetails.overview as string,
    releaseDate: remoteMovieDetails.release_date as string,
    genres: remoteMovieDetails.genres.map(
      (genre: Movie.Genre) => genre.name,
    ) as Array<string>,
    poster:
      `https://image.tmdb.org/t/p/w500${remoteMovieDetails.poster_path}` as string,
    directors: movieCredits.crew
      .filter((crew: Movie.Crew) => crew.job === "Director")
      .map((crew: Movie.Crew) => crew.name) as Array<string>,
    casts: movieCredits.cast
      .slice(0, 5)
      .map((cast: Movie.Cast) => cast.name) as Array<string>,
  };
}

export async function getMovies(imdbIds: Array<string>) {
  // Fetch all movies in parallel
  const allMovies = await Promise.all(imdbIds.map(getMovie));

  // Remove any null values (failed fetches)
  return allMovies.filter((movie) => movie !== null);
}

// export async function getMovieByImdbId(imdbId: string) {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
//   );
//   const data = await res.json();
//   const movie = data.movie_results[0];
//   if (!movie) return null;

//   const creditsRes = await fetch(
//     `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}`
//   );
//   const credits = await creditsRes.json();

//   const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//   const genres = movie.genres.map((genre: Movie.Genre) => genre.name);
//   const director = credits.crew.find(
//     (crew: Movie.Crew) => crew.job === "Director"
//   );
//   const casts = credits.cast.slice(0, 5).map((cast: Movie.Cast) => cast.name);

//   return {
//     title: movie.title,
//     overview: movie.overview,
//     releaseDate: movie.release_date,
//     director: director.name,
//     poster,
//     genres,
//     casts,
//   };
// }
