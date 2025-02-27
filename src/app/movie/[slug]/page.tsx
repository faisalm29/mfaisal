import { allMovies } from "content-collections";
import getMoviesByImdbIds from "../../../../lib/tmdb";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXContent } from "@content-collections/mdx/react";
import MDXContainer from "@/components/MDXContainer";

export async function generateStaticParams() {
  const imdbIds = allMovies.map((movie) => movie.imdbId);
  const movies = await getMoviesByImdbIds(imdbIds);
  return movies.map((movie) => ({
    slug: movie.slug,
  }));
}

export default async function Movie({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const imdbIds = allMovies.map((movie) => movie.imdbId);
  const movies = await getMoviesByImdbIds(imdbIds);

  const movie = movies.find(
    (movie) => movie.slug === "movie".concat("/", slug),
  );

  if (!movie) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-[65ch]">
      {/* title */}

      <h1 className="text-secondary-200 mt-[0.6em] mb-[0.6em] font-bold">
        {movie.title}
      </h1>

      <div className="prose prose-p:text-secondary-400">
        {/* Poster */}
        <div className="mx-auto w-max">
          {movie.poster && (
            <Image
              src={movie.poster}
              alt={movie.title}
              width={300}
              height={600}
            />
          )}
        </div>

        {/* overview */}
        <p>Synopsis: {movie.overview}</p>

        {/* Movie genre */}
        <p>Genre: {movie.genres.map(String).join(", ")}</p>

        {/* release date */}
        <p>
          Release Date:{" "}
          <time dateTime={movie.releaseDate}>{movie.releaseDate}</time>
        </p>

        {/* director */}
        <p>Director: {movie.director}</p>

        {/* Top 5 cast */}
        <p>Cast: {movie.casts.map(String).join(", ")}</p>
      </div>

      {/* Body */}
      <h2 className="text-secondary-200 mt-10 mb-5 font-bold">My Take</h2>
      <div className="prose prose-p:text-secondary-400 prose-a:no-underline prose-li:text-secondary-400 prose-strong:text-secondary-200 prose-th:text-secondary-200 prose-td:text-secondary-400 checked:bg-accent prose-tr:even:bg-[#172135] prose-tr:odd:bg-primary marker:text-gray-500">
        <MDXContent code={movie.body as string} components={MDXContainer} />
      </div>
    </article>
  );
}
