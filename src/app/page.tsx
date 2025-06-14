import Profile from "@/components/Profile";
import PostSectionWrapper from "@/components/PostSectionWrapper";
import { PlainCard } from "@/components/Card";
import { blogs, programmings, movies } from "#velite";
import getMoviesByImdbIds from "../../lib/tmdb";
import { Movie } from "#velite";

export default async function Home() {
  const imdbIds = movies.map((movie: Movie) => movie.imdbId);

  const res = await getMoviesByImdbIds(imdbIds);

  const allMovies = res.map((movie) => ({
    title: movie.title,
    publishedDate: movie.publishedDate,
    category: movie.category,
    slug: movie.slug,
    published: movie.published,
  }));

  const allBlogs = blogs.map((post) => ({
    title: post.title,
    publishedDate: post.publishedDate,
    category: post.category,
    slug: post.slug,
    published: post.published,
  }));

  const allProgrammings = programmings.map((post) => ({
    title: post.title,
    publishedDate: post.publishedDate,
    category: post.category,
    slug: post.slug,
    published: post.published,
  }));

  const allContents = [...allBlogs, ...allProgrammings, ...allMovies];

  const sortedContents = allContents
    .filter((content) => content.published)
    .sort((a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate));

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
