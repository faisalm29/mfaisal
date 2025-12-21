// @ts-check
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import sectionize from "remark-sectionize";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import shikiDark from "./shiki-dark.json";

import mdx from "@astrojs/mdx";

import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://mfaisal.xyz",
  integrations: [mdx(), icon(), sitemap(), react()],
  markdown: {
    rehypePlugins: [rehypeHeadingIds, rehypeAutolinkHeadings],
    remarkPlugins: [remarkReadingTime, sectionize],
    syntaxHighlight: {
      type: "shiki",
    },
    shikiConfig: {
      themes: {
        // @ts-ignore
        dark: shikiDark,
        light: "catppuccin-latte",
      },
    },
  },

  image: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
