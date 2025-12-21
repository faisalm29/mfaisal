import { useState, useEffect, useRef } from "react";
import { BrandLogo } from "./BrandLogo";
import { DesktopNavLink } from "./DesktopNavLink";
import { MobileNavLink } from "./MobileNavLink";
import { RiMenuFill, RiSearchLine, RiCloseLargeFill } from "react-icons/ri";

const links = [
  {
    url: "/about",
    text: "About",
  },
  {
    url: "/blog",
    text: "General",
  },
  {
    url: "/programming",
    text: "Programming",
  },
  {
    url: "/movies",
    text: "Movies",
  },
  {
    url: "/chart",
    text: "Chart",
  },
];

const MOBILE_BREAKPOINT = 768;

interface Props {
  currentRoute: string;
  onSearchOpen: () => void;
}

export const Header = ({ currentRoute, onSearchOpen }: Props) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const wasOpenBeforeResize = useRef(false);

  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleResize = () => {
      const isDesktop = window.innerWidth >= MOBILE_BREAKPOINT;

      if (isDesktop && isMobileNavOpen) {
        wasOpenBeforeResize.current = true;
        setIsMobileNavOpen(false);
      }

      if (!isDesktop && wasOpenBeforeResize.current) {
        setIsMobileNavOpen(true);
        wasOpenBeforeResize.current = false;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileNavOpen]);

  return (
    <header className="bg-neutral/10 border-b-tertiary-default/50 sticky top-0 z-10 border-b px-4 py-4 backdrop-blur-md lg:px-0">
      <nav className="mx-auto max-w-[112ch]">
        <div className="flex items-center justify-between">
          <a href="/">
            <BrandLogo />
          </a>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              {/* search button */}
              <button
                id="search-btn"
                onClick={onSearchOpen}
                className="bg-tertiary-default flex items-center gap-2 rounded-full px-6 py-[1px] transition-all duration-300"
              >
                <RiSearchLine className="text-secondary-default text-base transition-all duration-300 ease-in-out" />
                <p>Search</p>
              </button>

              <ul className="hidden items-center gap-4 md:flex">
                {links.map((link) => (
                  <DesktopNavLink
                    key={link.url}
                    url={link.url}
                    text={link.text}
                    currentRoute={currentRoute}
                    hovered={hovered}
                    setHovered={setHovered}
                  />
                ))}
              </ul>
            </div>

            {/* hamburger button */}
            <button className="cursor-pointer md:hidden">
              <RiMenuFill
                onClick={() => setIsMobileNavOpen(true)}
                className="text-secondary-emphasize text-[32px]"
              />
            </button>
          </div>
        </div>

        {/* mobile navigation */}
        {isMobileNavOpen && (
          <div
            className={`bg-neutral fixed top-0 left-0 z-40 h-screen w-screen p-4 md:hidden`}
          >
            <div className="flex h-full w-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <a href="/">
                  <BrandLogo />
                </a>
                <button className="cursor-pointer">
                  <RiCloseLargeFill
                    onClick={() => setIsMobileNavOpen(false)}
                    className="text-secondary-emphasize text-[32px]"
                  />
                </button>
              </div>
              <ul className="spacing-y-loosest flex flex-col">
                {links.map((link) => (
                  <MobileNavLink
                    key={link.url}
                    url={link.url}
                    text={link.text}
                  />
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <p>&copy; Anonim</p>
                <p>{new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
