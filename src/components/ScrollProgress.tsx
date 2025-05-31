"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [ScrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const progress = (scrollY / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);
  return (
    <div className="fixed top-0 left-0 z-[101] h-0.5 w-full bg-transparent">
      <div
        className="bg-accent h-full transition-all duration-100 ease-out"
        style={{ width: `${ScrollProgress}%` }}
      ></div>
    </div>
  );
}
