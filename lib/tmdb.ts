import { getCollection } from "astro:content";

const TMDB_API_KEY = import.meta.env.TMDB_API_KEY;
const moviePosts = await getCollection("movies");

export async function getMovie(imdbId: string) {
  // get single movie based on its IMDB ID
  const res = await fetch(
    `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
  );
  if (!res.ok) throw new Error(`Failed to fetch movie for IMDB ID: ${imdbId}`);
  const data = await res.json();
  const movie = data.movie_results[0];
  if (!movie) return null;

  // get tmdbId to fetch movie data
  const tmdbId = movie.id;

  // fetch movie data
  const movieDataRes = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}`
  );
  if (!movieDataRes.ok) throw new Error("Failed to fetch movie movie data");
  const movieData = await movieDataRes.json();

  // fetch movie credits
  const movieCreditsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}`
  );
  if (!movieCreditsRes.ok) throw new Error("Failed to fetch movie credits");
  const movieCredits = await movieCreditsRes.json();

  // get corresponding movie data form Movie content collection MDX files
  const moviePostData = moviePosts.find(
    (movie) => movie.data.imdbId === imdbId
  );

  return {
    id: moviePostData?.id,
    category: moviePostData?.data.category,
    pubDate: moviePostData?.data.pubDate,
    title: movieData.title,
    overview: movieData.overview,
    releaseDate: movieData.release_date,
    genres: movieData.genres.map((genre: Movie.Genre) => genre.name),
    poster: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
    director: movieCredits.crew.find(
      (crew: Movie.Crew) => crew.job === "Director"
    ).name,
    casts: movieCredits.cast.slice(0, 5).map((cast: Movie.Cast) => cast.name),
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
