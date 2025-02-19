import { defineCollection, defineConfig, z } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";

// this is collection for general blog (general) posts
const blog = defineCollection({
  name: "blog",
  directory: "content/blog",
  include: "*.mdx",
  schema: (z) => ({
    category: z.string(),
    title: z.string(),
    summary: z.string(),
    publishedDate: z.coerce.date(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
      readingTime: JSON.stringify(readingTime(document.content)),
      slug: document.category.concat("/", document._meta.path),
    };
  },
});

// this is collection for programming (code) posts
const programming = defineCollection({
  name: "programming",
  directory: "content/programming",
  include: "*.mdx",
  schema: (z) => ({
    category: z.string(),
    title: z.string(),
    summary: z.string(),
    publishedDate: z.coerce.date(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
      readingTime: JSON.stringify(readingTime(document.content)),
      slug: document.category.concat("/", document._meta.path),
    };
  },
});

export default defineConfig({
  collections: [blog, programming],
});
