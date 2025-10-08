import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// General category in blog route
const general = defineCollection({
  loader: glob({
    pattern: "*.mdx",
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
    pattern: "*.mdx",
    base: "./src/data/movies",
  }),
  schema: z.object({
    category: z.string(),
    imdbId: z.string(),
    pubDate: z.date(),
  }),
});

export const collections = { general, programming, movies };
