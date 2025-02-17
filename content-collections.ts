import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

// this is collection for general blog posts
const blog = defineCollection({
  name: "blog",
  directory: "content/blog",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});

// this is collection for
const programming = defineCollection({
  name: "programming",
  directory: "content/programming",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [blog, programming],
});
