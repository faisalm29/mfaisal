import { getCollection } from "astro:content";
import { getMovies } from "./tmdb";

export async function getMoviesData() {
  const entries = await getCollection("movies", ({ data }) => {
    return import.meta.env.PROD ? data.published === true : true;
  });

  const sorted = entries.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const imdbIds = sorted.map((post) => post.data.imdbId);
  const movies = await getMovies(imdbIds);

  return { movies };
}
