import type { MetadataRoute } from "next";
import { blogs, programmings, movies } from "#velite";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
      ? "http://localhost:3000/"
      : "https://mfaisal.xyz/";

  const staticPaths = ["", "about", "blog", "programming", "movie", "chart"];

  const blogPaths = blogs.map((blog) => blog.slug);

  const programmingPaths = programmings.map((programming) => programming.slug);

  const moviePaths = movies.map((movie) => movie.slug);

  const allPaths = [
    ...staticPaths,
    ...blogPaths,
    ...programmingPaths,
    ...moviePaths,
  ];

  return allPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));
}
