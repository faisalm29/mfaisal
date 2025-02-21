import Link from "next/link";

interface AnchorLinkProps {
  href: string;
  children: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
}

const AnchorLink = ({ href, children, target }: AnchorLinkProps) => {
  return (
    <Link
      href={href}
      target={target}
      className="text-secondary-200 hover:text-accent font-medium transition-colors duration-300 ease-in-out"
    >
      {children}
    </Link>
  );
};

export default AnchorLink;
