import { Home } from "./Icon";
import Link from "next/link";

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
  return (
    <nav>
      <Link href="/">
        <Home />
      </Link>
      <div>
        {links.map((link, id) => (
          <Link key={id} href={link.url}>
            {link.placeholder}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
