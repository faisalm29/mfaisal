"use client";

import { useState, useEffect } from "react";
import { RiArrowUpLine } from "@remixicon/react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  //   Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`hover:text-secondary-200 cursor-pointer ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} transition-all duration-300 ease-in-out`}
      >
        <RiArrowUpLine />
      </button>
    </>
  );
};

export default BackToTopButton;
