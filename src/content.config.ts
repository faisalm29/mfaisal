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
    published: z.boolean(),
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
    published: z.boolean(),
  }),
});

// Movies category in movies route
const movies = defineCollection({
  loader: glob({
    pattern: "*/index.mdx",
    base: "./src/data/movies",
  }),
  schema: z.object({
    category: z.string(),
    imdbId: z.string(),
    pubDate: z.date(),
    published: z.boolean(),
  }),
});

const comments = defineCollection({
  loader: glob({
    pattern: "**/comments/*.mdx",
    base: "./src/data",
  }),
  schema: z.object({
    name: z.string(),
    timestamp: z.date(),
    avatar: z.string(),
    website: z.string().optional(),
    postName: z.string(),
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

export const collections = { general, programming, movies, comments, social };
