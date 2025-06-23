import { defineCollection, defineConfig, s } from "velite";
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import fs from "node:fs";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerNotationDiff } from "@shikijs/transformers";
import { formatDate } from "./lib/utils";

const highlighterTheme = JSON.parse(
  fs.readFileSync("./highlighter-theme.json", "utf-8"),
);

const blogs = defineCollection({
  name: "Blog",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.path(),
      summary: s.string(),
      publishedDate: s.isodate(),
      category: s.string(),
      code: s.mdx(),
      plain: s.raw(),
      published: s.boolean().default(true),
    })
    .transform((data) => ({
      ...data,
      readingTime: JSON.stringify(readingTime(data.plain)),
      permalink: `${data.slug}`,
    })),
});

const programmings = defineCollection({
  name: "Programming",
  pattern: "programming/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.path(),
      summary: s.string(),
      publishedDate: s.isodate(),
      category: s.string(),
      code: s.mdx(),
      plain: s.raw(),
      published: s.boolean().default(true),
    })
    .transform((data) => ({
      ...data,
      readingTime: JSON.stringify(readingTime(data.plain)),
      permalink: `${data.slug}`,
    })),
});

const movies = defineCollection({
  name: "Movie",
  pattern: "movie/**/*.mdx",
  schema: s
    .object({
      category: s.string(),
      imdbId: s.string(),
      publishedDate: s.isodate(),
      slug: s.path(),
      code: s.mdx(),
      published: s.boolean().default(true),
    })
    .transform((data) => ({
      ...data,
      permalink: `${data.slug}`,
    })),
});

const changelogs = defineCollection({
  name: "Changelog",
  pattern: "changelog/**/*.mdx",
  schema: s.object({
    date: s.path().transform((value) => formatDate(value.split("/")[1])),
    body: s.mdx(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
  },
  collections: {
    blogs,
    programmings,
    movies,
    changelogs,
  },
  mdx: {
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
    remarkPlugins: [remarkGfm, remarkToc],
  },
});
