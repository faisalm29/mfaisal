import { Blog } from "#velite";
import AnchorLink from "../AnchorLink";

const DetailedCard = ({ post }: { post: Blog }) => {
  return (
    <div className="mb-8">
      <h2 className="mb-1 font-bold">{post.title}</h2>
      <p className="mb-1">{post.summary}</p>
      <AnchorLink href={post.slug}>Read more →</AnchorLink>
    </div>
  );
};

export default DetailedCard;
