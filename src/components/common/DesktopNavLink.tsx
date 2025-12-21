import { useState } from "react";

interface Props {
  text: string;
  url: string;
  currentRoute: string;
  hovered: string | null;
  setHovered: (url: string | null) => void;
}

export const DesktopNavLink = ({
  text,
  url,
  currentRoute,
  hovered,
  setHovered,
}: Props) => {
  const isActive =
    hovered !== null ? hovered === url : currentRoute.startsWith(url);
  return (
    <li>
      <a
        href={url}
        onMouseEnter={() => setHovered(url)}
        onMouseLeave={() => setHovered(null)}
        className={`before:content-[] before:bg-secondary-emphasize relative font-medium capitalize transition-all duration-300 ease-in-out before:absolute before:top-[26px] before:block before:h-1 before:w-full before:rounded-full before:transition-all before:duration-300 before:ease-in-out ${isActive ? "text-secondary-emphasize before:opacity-100" : "text-secondary-default before:opacity-0"}`}
      >
        {text}
      </a>
    </li>
  );
};
