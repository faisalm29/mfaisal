"use client";

import { useState, useRef, useEffect } from "react";
import { RiArrowDownSLine } from "@remixicon/react";

interface AccordionProps {
  date: string;
  children: React.ReactNode | React.ReactNode[];
  isExpanded: boolean;
  onClick: () => void;
}

const Accordion = ({ date, children, isExpanded, onClick }: AccordionProps) => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  return (
    // wrapper
    <div className="border-b-secondary-200 overflow-hidden border-b-[1px]">
      {/* question container */}
      <div
        onClick={onClick}
        className={`flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-[10px] py-[20px] text-left`}
      >
        {/* question content */}
        <p className="text-secondary-200">{date}</p>

        {/* arrow */}
        <RiArrowDownSLine
          className={`${isExpanded ? "rotate-180" : ""} transition-all duration-300 ease-in-out`}
        />
      </div>

      {/* Answer container */}
      <div
        ref={contentRef}
        className={`px-2.5 transition-all duration-300 ease-in-out`}
        style={{
          height: isExpanded ? `${contentHeight}px` : "0px",
        }}
        aria-hidden={!isExpanded}
      >
        {/* answer content */}
        <div className="prose text-secondary-400 pb-5">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
