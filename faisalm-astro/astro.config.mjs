// @ts-check
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import sectionize from "remark-sectionize";
import shikiDark from "./shiki-dark.json";

import mdx from "@astrojs/mdx";

import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), icon()],
  markdown: {
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
