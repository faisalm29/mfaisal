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
    <article>
      <h1>All Movies</h1>

      {/* title */}
      <h2>{movie.title}</h2>

      {/* Poster */}
      {movie.poster && (
        <Image src={movie.poster} alt={movie.title} width={100} height={200} />
      )}

      {/* overview */}
      <p>{movie.overview}</p>

      {/* release date */}
      <time dateTime={movie.releaseDate}>{movie.releaseDate}</time>

      {/* director */}
      <p>{movie.director}</p>

      {/* top 5 casts */}
      <ul>
        {movie.casts.map((cast: string, id: string) => (
          <li key={id}>{cast}</li>
        ))}
      </ul>

      {/* Body */}
      <MDXContent code={movie.body as string} components={MDXContainer} />
    </article>
  );
}
