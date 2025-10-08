"use client";

import Accordion from "./Accordion";
import { changelogs } from "#velite";
import { MDXContent } from "./MDXContent";
import { useState } from "react";

const Changelogs = () => {
  const [isExpandedIndex, setIsExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setIsExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const allChangelogs = changelogs.sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );

  return (
    <>
      <h1 className="text-secondary-200 mb-6 font-bold">Changelogs</h1>
      <ul>
        {allChangelogs.map((item, index) => (
          <li key={index}>
            <Accordion
              date={item.date}
              onClick={() => toggleAccordion(index)}
              isExpanded={isExpandedIndex === index}
            >
              <MDXContent code={item.body} />
            </Accordion>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Changelogs;
