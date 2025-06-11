import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
      ? "http://localhost:3000/"
      : "https://mfaisal.xyz/";
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: "/private/",
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: "/private/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: "/private/",
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: "/private/",
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "facebookexternalhit",
        disallow: "/",
      },
      {
        userAgent: "ia_archiver",
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}sitemap.xml`,
  };
}
