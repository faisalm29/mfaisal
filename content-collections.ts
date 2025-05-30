import { defineCollection, defineConfig, z } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { transformerNotationDiff } from "@shikijs/transformers";
import rehypePrettyCode from "rehype-pretty-code";
import fs from "node:fs";
import remarkToc from "remark-toc";

// const shikiOptions = rehypePrettyCode({theme: })

const highlighterTheme = JSON.parse(
  fs.readFileSync("./highlighter-theme.json", "utf-8"),
);

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
    const body = await compileMDX(context, document, {
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      remarkPlugins: [remarkGfm, remarkToc],
    });
    return {
      ...document,
      body,
      readingTime: JSON.stringify(readingTime(document.content)),
      slug: "blog".concat("/", document._meta.path),
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
    const body = await compileMDX(context, document, {
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [
          rehypePrettyCode,
          {
            theme: await highlighterTheme,
            transformers: [transformerNotationDiff()],
          },
        ],
      ],
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      body,
      readingTime: JSON.stringify(readingTime(document.content)),
      slug: "programming".concat("/", document._meta.path),
    };
  },
});

// this is collection for general blog (general) posts
const movie = defineCollection({
  name: "movie",
  directory: "content/movie",
  include: "*.mdx",
  schema: (z) => ({
    category: z.string(),
    imdbId: z.string(),
    publishedDate: z.coerce.date(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      body,
      slug: "movie".concat("/", document._meta.path),
    };
  },
});

export default defineConfig({
  collections: [blog, programming, movie],
});
