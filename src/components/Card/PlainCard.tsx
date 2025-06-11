import Link from "next/link";
import { formatDate } from "../../../lib/utils";

interface Post {
  title: string;
  publishedDate: string;
  category: string;
  slug: string;
}

const PlainCard = ({ post }: { post: Post }) => {
  const dateTime = post.publishedDate
    .replace(/T.*/, "")
    .split("-")
    .reverse()
    .join("-");

  return (
    <Link
      href={post.slug}
      className="group mb-6 flex flex-col justify-between last:mb-0 md:grid md:w-full md:grid-cols-12"
    >
      <time
        dateTime={dateTime}
        className="group-hover:text-accent col-span-2 mb-1 transition-colors duration-300 ease-in-out md:mb-0"
      >
        {formatDate(post.publishedDate)}
      </time>
      <div className="col-span-10">
        <p className="group-hover:text-accent mb-1 capitalize transition-colors duration-300 ease-in-out">
          {post.category}
        </p>
        <h3 className="text-secondary-200 group-hover:text-accent text-base font-medium transition-colors duration-300 ease-in-out">
          {post.title}
        </h3>
      </div>
    </Link>
  );
};

export default PlainCard;
