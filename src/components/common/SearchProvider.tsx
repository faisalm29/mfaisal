import { useEffect, useState } from "react";
import { Header } from "./Header";
import { SearchOverlay } from "./SearchOverlay";

interface Props {
  currentRoute: string;
}

export const SearchProvider = ({ currentRoute }: Props) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  //   scroll lock
  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  //   keyboard shorcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !isSearchOpen &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }

      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isSearchOpen]);

  return (
    <>
      <Header
        onSearchOpen={() => setIsSearchOpen(true)}
        currentRoute={currentRoute}
      />
      <SearchOverlay
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
