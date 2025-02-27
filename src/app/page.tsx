import Profile from "@/components/Profile";
import PostSectionWrapper from "@/components/PostSectionWrapper";
import { PlainCard } from "@/components/Card";
import { allBlogs, allProgrammings, allMovies } from "content-collections";
import getMoviesByImdbIds from "../../lib/tmdb";
import type { Movie } from "content-collections";

export default async function Home() {
  const imdbIds = allMovies.map((movie: Movie) => movie.imdbId);

  const res = await getMoviesByImdbIds(imdbIds);

  const movies = res.map((movie) => ({
    title: movie.title,
    publishedDate: movie.publishedDate,
    category: movie.category,
    slug: movie.slug,
  }));

  const blogs = allBlogs.map((post) => ({
    title: post.title,
    publishedDate: post.publishedDate,
    category: post.category,
    slug: post.slug,
  }));

  const codes = allProgrammings.map((post) => ({
    title: post.title,
    publishedDate: post.publishedDate,
    category: post.category,
    slug: post.slug,
  }));

  // @ts-expect-error: always show error because match overload
  const allContents = codes.concat(movies, blogs);

  const sortedContents = allContents.sort(
    (a, b) =>
      Date.parse(b.publishedDate.toISOString()) -
      Date.parse(a.publishedDate.toISOString()),
  );

  return (
    <>
      <Profile />
      <PostSectionWrapper>
        {sortedContents.map((content, id) => (
          <PlainCard key={id} post={content} />
        ))}
      </PostSectionWrapper>
    </>
  );
}
