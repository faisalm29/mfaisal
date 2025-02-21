import Link from "next/link";

interface Post {
  title: string;
  publishedDate: Date;
  category: string;
  slug: string;
}

const PlainCard = ({ post }: { post: Post }) => {
  const dateTime = post.publishedDate
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    .reverse()
    .join("-");

  return (
    <Link
      href={post.slug}
      className="group mb-6 flex w-fit flex-col justify-between gap-x-12 font-medium last:mb-0 md:grid md:w-full md:grid-cols-12"
    >
      <time
        dateTime={dateTime}
        className="group-hover:text-accent col-span-3 mb-1 transition-colors duration-300 ease-in-out md:mb-0"
      >
        {post.publishedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </time>
      <div className="col-span-9">
        <p className="group-hover:text-accent mb-1 capitalize transition-colors duration-300 ease-in-out">
          {post.category}
        </p>
        <h3 className="text-secondary-200 group-hover:text-accent text-base transition-colors duration-300 ease-in-out">
          {post.title}
        </h3>
      </div>
    </Link>
  );
};

export default PlainCard;
