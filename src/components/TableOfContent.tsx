"use client";

import { useState, useEffect, useMemo } from "react";
// import { usePathname } from "next/navigation";
import Link from "next/link";
import BackToTopButton from "./BackToTopButton";
import { useIntersectionObserver } from "../../lib/useIntersectionObserver";

const TableOfContent = () => {
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);
  const activeId = useIntersectionObserver(headings);

  useEffect(() => {
    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll("[data-heading]"),
    );

    setHeadings(headingElements);
    return () => {
      setHeadings([]);
    };
  }, []);

  const getLevel = useMemo(() => {
    return (nodename: string) => {
      return Number(nodename.replace("H", ""));
    };
  }, []);

  const mapHeadings = () => {
    return headings.map((heading) => {
      return (
        <Link
          href={`#${heading.id}`}
          key={heading.id}
          className={`text-sm transition-all duration-300 ease-in-out not-last:mb-2 ${getLevel(heading.nodeName) === 3 ? "pl-8" : "pl-0"} ${activeId === heading.id ? "text-accent" : "text-secondary-400"}`}
        >
          {heading.innerText}
        </Link>
      );
    });
  };

  return (
    <>
      <aside className="col-span-4 hidden pl-12 lg:block">
        <nav className="sticky top-[178px]">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-secondary-200 text-base font-bold uppercase">
              Table of Contents
            </h2>
            {/* Back to top button goes here. */}
            <BackToTopButton />
          </div>
          <div className="flex flex-col">{mapHeadings()}</div>
        </nav>
      </aside>
    </>
  );
};

export default TableOfContent;
