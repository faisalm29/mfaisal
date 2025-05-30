"use client";

import AnchorLink from "./AnchorLink";
import { RiHeartFill } from "@remixicon/react";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="mx-auto mt-24 mb-8 max-w-5xl sm:grid sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
      <p className="mb-2 sm:col-span-1 md:col-span-3 md:mb-0 lg:col-span-6 lg:mb-0">
        © Faisal M. 2025{currentYear > 2025 && ` - ${currentYear}`}.
      </p>
      <p className="sm:col-span-3 sm:ml-8 md:col-span-5 md:ml-0 lg:col-span-6 lg:ml-0">
        Coded with{" "}
        <RiHeartFill className="inline transition-colors duration-300 ease-in-out hover:text-red-500" />{" "}
        in{" "}
        <AnchorLink href="https://code.visualstudio.com/" target="_blank">
          Visual Studio Code
        </AnchorLink>
        . Built with{" "}
        <AnchorLink href="https://nextjs.org/" target="_blank">
          Next.js
        </AnchorLink>
        ,{" "}
        <AnchorLink href="https://www.content-collections.dev/" target="_blank">
          Content Collections
        </AnchorLink>
        ,{" "}
        <AnchorLink href="https://tailwindcss.com/" target="_blank">
          Tailwind CSS
        </AnchorLink>
        , and deployed with{" "}
        <AnchorLink href="https://vercel.com/home" target="_blank">
          Vercel
        </AnchorLink>
        . All text is set in{" "}
        <AnchorLink href="https://rsms.me/inter/" target="_blank">
          Inter
        </AnchorLink>{" "}
        typeface.
      </p>
    </footer>
  );
};

export default Footer;
