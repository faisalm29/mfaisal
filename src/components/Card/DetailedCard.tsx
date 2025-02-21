import Link from "next/link";
import type { Blog } from "content-collections";

const DetailedCard = ({ post }: { post: Blog }) => {
  return (
    <div>
      <h1 className="font-bold">{post.title}</h1>
      {post.summary ?? <p>{post.summary}</p>}
      <Link href={post.slug}>Read more</Link>
    </div>
  );
};

export default DetailedCard;
