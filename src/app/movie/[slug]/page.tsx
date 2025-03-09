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
    <article className="mx-auto mt-24 max-w-[65ch]">
      <div className="mb-4 grid grid-cols-12 gap-4">
        <div className="col-span-3">
          {movie.poster && (
            <Image
              src={movie.poster}
              alt={movie.title}
              width={100}
              height={200}
              className="not-prose h-auto w-full rounded"
            />
          )}
        </div>
        <div className="bg-surface col-span-9 flex items-center rounded p-4">
          <div>
            <h1 className="text-secondary-200 mb-4 font-bold">{movie.title}</h1>

            <div className="flex gap-2">
              <time dateTime={movie.releaseDate}>
                {new Date(movie.releaseDate).getFullYear()}
              </time>
              •<p>{movie.genres.map(String).join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded p-4">
        <h2 className="text-secondary-200 mb-4 font-bold">Movie Info</h2>
        {/* Director */}
        <div className="mb-4">
          <p className="text-secondary-200 font-bold">Director</p>
          <p>{movie.director}</p>
        </div>

        {/* Cast */}
        <div className="mb-4">
          <p className="text-secondary-200 font-bold">Cast</p>
          <p>{movie.casts.map(String).join(", ")}</p>
        </div>

        {/* Overview */}
        <div>
          <p className="text-secondary-200 font-bold">Overview</p>
          <p>{movie.overview}</p>
        </div>
      </div>

      {/* Body */}
      <h2 className="text-secondary-200 mt-10 mb-5 font-bold">My Take</h2>
      <div className="prose prose-p:text-secondary-400 prose-a:no-underline prose-li:text-secondary-400 prose-strong:text-secondary-200 prose-th:text-secondary-200 prose-td:text-secondary-400 checked:bg-accent prose-tr:even:bg-[#172135] prose-tr:odd:bg-primary marker:text-gray-500">
        <MDXContent code={movie.body as string} components={MDXContainer} />
      </div>
    </article>
  );
}
