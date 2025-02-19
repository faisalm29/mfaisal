import Link from "next/link";

interface Post {
  title: string;
  publishedDate: Date;
  category: string;
  slug: string;
}

const PlainCard = ({ post }: { post: Post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <Link href={post.slug}>Read more →</Link>
    </div>
  );
};

export default PlainCard;
