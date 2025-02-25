import { allMovies } from "content-collections";
import { Crew, Cast } from "@/types";

const getMoviesByImdbIds = async (imdbIds: string[]) => {
  const API_KEY = process.env.TMDB_API_KEY; // load tmdb api key from .env.local

  // Function to fetch movie details for a single IMDB ID
  const fetchMovie = async (imdbId: string) => {
    try {
      // Find the TMDB Movie ID
      const findUrl = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${API_KEY}&external_source=imdb_id`;
      const findRes = await fetch(findUrl);
      if (!findRes.ok)
        throw new Error(`Failed to find movie for IMDB ID: ${imdbId}`);

      const findData = await findRes.json();
      const movie = findData.movie_results[0];
      if (!movie) return null;

      const movieId = movie.id; // TMDB Movie Id

      // Fetch Movie details
      const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
      const detailsRes = await fetch(detailsUrl);
      if (!detailsRes.ok) throw new Error("Failed to fetch movie details");

      const details = await detailsRes.json();

      // fetch movie credits (director and casts)
      const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
      const creditsRes = await fetch(creditsUrl);
      if (!creditsRes.ok) throw new Error("Failed to fetch movie credits");

      const credits = await creditsRes.json();

      // extract director
      const director =
        credits.crew.find((person: Crew) => person.job === "Director")?.name ||
        "Unknown";

      // Get top 5 cast members
      const casts = credits.cast.slice(0, 5).map((actor: Cast) => actor.name);

      //  fetch movie from mdx to get slug and body text
      const movieMDX = allMovies.find((m) => m.imdbId === imdbId);

      return {
        imdbId,
        title: details.title,
        overview: details.overview,
        releaseDate: details.release_date,
        poster: details.poster_path
          ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
          : null,
        director,
        casts,
        slug: movieMDX?.slug,
        body: movieMDX?.body,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Fethc all movies in parallel
  const movies = await Promise.all(imdbIds.map(fetchMovie));

  // Remove any null values (failed fetches)
  return movies.filter((movie) => movie !== null);
};

export default getMoviesByImdbIds;
