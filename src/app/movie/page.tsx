import getMoviesByImdbIds from "../../../lib/tmdb";
import { allMovies } from "content-collections";
import Link from "next/link";
import siteConfig from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Movie Reviews | ${siteConfig.details.title}`,
  description: "Reviews of the movies I have been watching lately.",
};

const Movie = async () => {
  const imdbIds = allMovies.map((movie) => movie.imdbId);

  const movies = await getMoviesByImdbIds(imdbIds);

  return (
    <main className="mt-24">
      <h1 className="text-secondary-200 mb-6 font-bold">All Movies</h1>
      <ul>
        {movies.map((movie, id) => {
          if (movie.slug) {
            return (
              <Link
                href={movie.slug}
                key={id}
                className="group mb-6 flex flex-col justify-between last:mb-0 md:grid md:w-full md:grid-cols-12"
              >
                {movie.publishedDate && (
                  <time
                    dateTime={movie.publishedDate
                      ?.toISOString()
                      .replace(/T.*/, "")
                      .split("-")
                      .reverse()
                      .join("-")}
                    className="group-hover:text-accent col-span-2 mb-1 transition-colors duration-300 ease-in-out md:mb-0"
                  >
                    {movie.publishedDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}

                <div className="col-span-10">
                  <p className="group-hover:text-accent transition-colors duration-300 ease-in-out">
                    {movie.genres.map(String).join(", ")}
                  </p>
                  <h3 className="text-secondary-200 group-hover:text-accent text-base font-medium transition-colors duration-300 ease-in-out">
                    {movie.title}{" "}
                    <time dateTime={movie.releaseDate}>
                      ({new Date(movie.releaseDate).getFullYear()})
                    </time>
                  </h3>
                </div>
              </Link>
            );
          }
        })}
      </ul>
    </main>
  );
};

export default Movie;
