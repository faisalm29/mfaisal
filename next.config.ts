import type { NextConfig } from "next";
import { withcontentCollections } from "@content-collections/next";
import { withPigment, extendTheme } from "@pigment-css/nextjs-plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

const pigmentTheme = {
  theme: extendTheme({
    colors: {
      primary: "tomato",
      secondary: "cyan",
    },
    fontFamily: "Inter, sans-serif",
    fontFeatureSettings: `"cv01", "cv09", "cv03", "cv04", "zero", "cv05",
    "cv10" on`,
  }),
};

export default withcontentCollections(withPigment(nextConfig, pigmentTheme));
