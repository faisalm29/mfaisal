// @ts-check
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import mdx from "@astrojs/mdx";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), icon()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  image: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
});
