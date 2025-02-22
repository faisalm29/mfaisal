import AnchorLink from "./AnchorLink";

const MDXContainer = {
  a: ({ ...props }) => {
    return (
      <AnchorLink href={props.href} target="_blank">
        {props.children}
      </AnchorLink>
    );
  },
  h2: ({ ...props }) => (
    <h2 data-heading className="text-11xl text-secondary-200" {...props} />
  ),
  p: ({ ...props }) => <p className="text-red-400" {...props} />,
};

export default MDXContainer;
