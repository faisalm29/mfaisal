import { movies } from "#velite";
import getMoviesByImdbIds from "../../../../lib/tmdb";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXContent } from "@/components/MDXContent";

import type { Metadata } from "next";
import { cache } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

const getPost = cache(async (slug: string) => {
  const imdbIds = movies.map((movie) => movie.imdbId);
  const allMovies = await getMoviesByImdbIds(imdbIds);

  return allMovies.find((movie) => movie.slug === "movie".concat("/", slug));
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const movie = await getPost(slug);

  if (!movie) return {};

  return {
    title: `${movie.title} | Movie Reviews`,
    description: movie!.overview,
  };
}

export async function generateStaticParams() {
  const imdbIds = movies.map((movie) => movie.imdbId);
  const allMovies = await getMoviesByImdbIds(imdbIds);
  return allMovies.map((movie) => ({
    slug: movie.slug,
  }));
}

export default async function Movie({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const movie = await getPost(slug);

  if (!movie) {
    notFound();
  }

  return (
    <article className="mx-auto mt-10 max-w-[65ch]">
      <div className="prose flex">
        <time
          dateTime={movie.releaseDate}
          className="not-prose text-secondary-400 mr-2"
        >
          {new Date(movie.releaseDate).getFullYear()}
        </time>
        •
        <p className="not-prose text-secondary-400 ml-2">
          {movie.genres.map(String).join(", ")}
        </p>
      </div>

      {/* Title */}
      <h1 className="text-secondary-200 mt-[0.6em] mb-[0.6em] font-bold">
        {movie.title}
      </h1>

      <div className="gap-6 md:grid md:grid-cols-12">
        <div className="col-span-6 mb-4 md:mb-0">
          <Image
            src={movie.poster}
            alt={`${movie.title} poster`}
            width={500}
            height={750}
            className="h-auto w-full"
            priority
          />
        </div>

        {/* Movie info */}
        <div className="col-span-6">
          {/* Director */}
          <div className="mb-4">
            <p className="text-secondary-200">Director</p>
            <p>{movie.director}</p>
          </div>
          {/* Cast */}
          <div className="mb-4">
            <p className="text-secondary-200">Cast</p>
            <p>{movie.casts.map(String).join(", ")}</p>
          </div>
          {/* Overview */}
          <div>
            <p className="text-secondary-200">Overview</p>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <h2 className="text-secondary-200 mt-10 mb-5 font-bold">My Take</h2>
      <div className="prose prose-p:text-secondary-400 prose-a:no-underline prose-li:text-secondary-400 prose-strong:text-secondary-200 prose-th:text-secondary-200 prose-td:text-secondary-400 checked:bg-accent prose-tr:even:bg-[#172135] prose-tr:odd:bg-primary marker:text-gray-500">
        <MDXContent code={movie.body as string} />
      </div>
    </article>
  );
}
