import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getMovies } from "../../lib/tmdb";

export async function GET(context) {
  const generalPosts = (await getCollection("general")).map((post) => ({
    id: `/blog/${post.id}`,
    title: post.data.title,
    pubDate: post.data.pubDate,
    description: post.data.summary,
  }));

  const programmingPosts = (await getCollection("programming")).map((post) => ({
    id: `/programming/${post.id}`,
    title: post.data.title,
    pubDate: post.data.pubDate,
    description: post.data.summary,
  }));

  const movies = await getCollection("movies");
  const imdbIds = movies.map((movie) => movie.data.imdbId);
  const moviePosts = (await getMovies(imdbIds)).map((post) => ({
    id: `movies/${post.id}`,
    title: post.title,
    pubDate: post.pubDate,
    description: post.overview,
  }));

  const allPosts = [...generalPosts, ...programmingPosts, ...moviePosts].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
  );

  return rss({
    title: "Faisal M's Blog",
    description:
      "Hello, I'm Faisal! Here I write about programming, movies, and anything else that interests me.",
    site: context.site,
    items: allPosts.map((post) => ({
      title: post.title,
      pubDate: post.pubDate,
      description: post.description,
      link: post.id,
    })),
  });
}
