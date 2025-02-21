import AnchorLink from "./AnchorLink";
import { RiHeartFill } from "@remixicon/react";

const Footer = () => {
  return (
    <footer className="mx-auto mt-16 max-w-2xl">
      <p className="max-w-lg">
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
