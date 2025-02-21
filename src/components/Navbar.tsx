"use client";

import Link from "next/link";
import { RiMenuLine, RiHome2Fill, RiCloseLargeLine } from "@remixicon/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const links = [
  {
    url: "/about",
    placeholder: "About",
  },
  {
    url: "/blog",
    placeholder: "General",
  },
  {
    url: "/programming",
    placeholder: "Code",
  },
  {
    url: "/movie",
    placeholder: "Movies",
  },
];

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const route = usePathname();

  useEffect(() => {
    setMobileNav(false);
  }, [route]);

  return (
    <nav className="bg-primary sticky top-0">
      <div className="relative mx-auto max-w-4xl bg-transparent py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="border-secondary-200 text-secondary-200 hover:border-accent hover:text-accent hidden rounded-[8px] border-[1px] p-3 transition-colors duration-300 ease-in-out sm:block"
          >
            <RiHome2Fill />
          </Link>

          {/* desktop navigation */}
          <ul className="hidden gap-x-4 sm:flex">
            {links.map((link, id) => (
              <li
                key={id}
                className="hover:text-accent text-secondary-200 inline w-fit uppercase transition-colors duration-300 ease-in-out"
              >
                <Link href={link.url}>{link.placeholder}</Link>
              </li>
            ))}
          </ul>

          {/* hamburger button for mobile navigation */}
          <div className="flex w-full justify-end sm:hidden">
            <button
              onClick={() => setMobileNav(true)}
              className="border-secondary-200 text-secondary-200 hover:border-accent hover:text-accent rounded-[8px] border-[1px] p-3 transition-colors duration-300 ease-in-out"
            >
              <RiMenuLine />
            </button>
          </div>
        </div>

        {/* mobile navigation */}
        <div
          className={`${mobileNav ? "fixed" : "hidden"} top-0 left-0 h-screen w-full bg-slate-900 px-4 py-4 sm:hidden`}
        >
          <div className="mb-16 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileNav(false)}
              className="border-secondary-200 text-secondary-200 hover:border-accent hover:text-accent rounded-[8px] border-[1px] p-3 transition-colors duration-300 ease-in-out"
            >
              <RiHome2Fill />
            </Link>

            <button
              onClick={() => setMobileNav(false)}
              className="hover:border-accent hover:text-accent border-secondary-200 text-secondary-200 cursor-pointer rounded-[8px] border-[1px] p-3 transition-colors duration-300 ease-in-out"
            >
              <RiCloseLargeLine />
            </button>
          </div>

          <ul className="flex flex-col items-center">
            {links.map((link, id) => (
              <li
                key={id}
                className="hover:text-accent text-secondary-200 mb-4 w-fit text-2xl uppercase transition-colors duration-300 ease-in-out"
              >
                <Link href={link.url}>{link.placeholder}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
