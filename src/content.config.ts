import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

// General category in blog route
const general = defineCollection({
  loader: glob({
    pattern: "*/index.mdx",
    base: "./src/data/general",
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    pubDate: z.date(),
    category: z.string(),
  }),
});

// Programming category in programming route
const programming = defineCollection({
  loader: glob({
    pattern: "*.mdx",
    base: "./src/data/programming",
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    pubDate: z.date(),
    category: z.string(),
  }),
});

// Movies category in movie route
const movies = defineCollection({
  loader: glob({
    pattern: "*/index.mdx",
    base: "./src/data/movies",
  }),
  schema: z.object({
    category: z.string(),
    imdbId: z.string(),
    pubDate: z.date(),
  }),
});

const social = defineCollection({
  loader: file("src/data/social.json"),
  schema: z.object({
    name: z.string(),
    url: z.string(),
    icon: z.string(),
  }),
});

export const collections = { general, programming, movies, social };
