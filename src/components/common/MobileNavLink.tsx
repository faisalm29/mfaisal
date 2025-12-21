interface Props {
  url: string;
  text: string;
}

export const MobileNavLink = ({ url, text }: Props) => {
  return (
    <li className="text-center">
      <a
        href={url}
        className="hover:text-primary leading-dense text-secondary-emphasize text-5xl font-bold uppercase transition-all duration-300 ease-in-out"
      >
        {text}
      </a>
    </li>
  );
};
