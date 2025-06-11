import getMoviesByImdbIds from "../../../lib/tmdb";
import { blogs, programmings, movies, type Movie } from "#velite";
import { formatDate } from "../../../lib/utils";

function escapeXML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
      ? "http://localhost:3000/"
      : "https://mfaisal.xyz/";

  const imdbIds = movies.map((movie: Movie) => movie.imdbId);

  const res = await getMoviesByImdbIds(imdbIds);

  const allMovies = res.map((movie) => ({
    title: movie.title,
    publishedDate: movie.publishedDate,
    category: movie.category,
    slug: movie.slug,
    description: movie.overview,
  }));

  const allBlogs = blogs.map((post) => ({
    title: post.title,
    publishedDate: post.publishedDate,
    category: post.category,
    slug: post.slug,
    description: post.summary,
  }));

  const allProgrammings = programmings.map((post) => ({
    title: post.title,
    publishedDate: post.publishedDate,
    category: post.category,
    slug: post.slug,
    description: post.summary,
  }));

  const allContents = [...allBlogs, ...allProgrammings, ...allMovies]
    .sort((a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate))
    .slice(0, 20);

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Your Blog Title</title>
    <link>${baseUrl}</link>
    <description>Latest posts from my blog</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${allContents
      .map((content) => {
        return `
    <item>
      <title>${escapeXML(content.title)}</title>
      <link>${baseUrl}blog/${content.slug}</link>
      <guid>${baseUrl}blog/${content.slug}</guid>
      <pubDate>${formatDate(content.publishedDate)}</pubDate>
      <description>${escapeXML(content.description)}</description>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`,
    {
      headers: {
        "Content-Type": "text/xml",
      },
    },
  );
}
