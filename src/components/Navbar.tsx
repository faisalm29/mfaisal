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
      <ul>
        {links.map((link, id) => (
          <li key={id}>
            <Link href={link.url}>{link.placeholder}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
