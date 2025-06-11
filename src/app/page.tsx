import Profile from "@/components/Profile";
import PostSectionWrapper from "@/components/PostSectionWrapper";
import { PlainCard } from "@/components/Card";
// import { allBlogs, allProgrammings, allMovies } from "content-collections";
import { blogs, programmings, movies } from "#velite";
import getMoviesByImdbIds from "../../lib/tmdb";
// import type { Movie } from "content-collections";
import { Movie } from "#velite";

export default async function Home() {
  const imdbIds = movies.map((movie: Movie) => movie.imdbId);

  const res = await getMoviesByImdbIds(imdbIds);

  const allMovies = res.map((movie) => ({
    title: movie.title,
    publishedDate: movie.publishedDate,
    category: movie.category,
    slug: movie.slug,
  }));

  const allBlogs = blogs.map((post) => ({
    title: post.title,
    publishedDate: post.publishedDate,
    category: post.category,
    slug: post.slug,
  }));

  const allProgrammings = programmings.map((post) => ({
    title: post.title,
    publishedDate: post.publishedDate,
    category: post.category,
    slug: post.slug,
  }));

  // @ts-expect-error: always show error because match overload
  const allContents = allProgrammings.concat(allMovies, allBlogs);

  const sortedContents = allContents.sort(
    (a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate),
  );

  return (
    <>
      <Profile />
      <PostSectionWrapper title="Latest Posts">
        {sortedContents.map((content, id) => (
          <PlainCard key={id} post={content} />
        ))}
      </PostSectionWrapper>
    </>
  );
}
