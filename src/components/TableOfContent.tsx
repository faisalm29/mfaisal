"use client";

import { useState, useEffect, useMemo } from "react";
// import { usePathname } from "next/navigation";
import Link from "next/link";
import { RiArrowUpLine } from "@remixicon/react";

const TableOfContent = () => {
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);

  useEffect(() => {
    const headingElement: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll("[data-heading]"),
    );
    setHeadings(headingElement);
    return () => {
      setHeadings([]);
    };
  }, []);

  const getLevel = useMemo(() => {
    return (nodeName: string) => {
      return Number(nodeName.replace("H", ""));
    };
  }, []);

  const mapHeadings = () => {
    return headings.map((heading) => {
      return (
        <Link
          href={`#${heading.id}`}
          key={heading.id}
          className={`text-secondary-400 ${getLevel(heading.nodeName) === 3 && "pl-8"}`}
        >
          {heading.innerText}
        </Link>
      );
    });
  };

  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-secondary-200">Table of Contents</p>
        <button
          onClick={() => backToTop()}
          className="bg-secondary-200 text-surface cursor-pointer rounded"
        >
          <RiArrowUpLine />
        </button>
      </div>
      <ul>
        <li className="flex flex-col gap-4">{mapHeadings()}</li>
      </ul>
    </>
  );
};

export default TableOfContent;
