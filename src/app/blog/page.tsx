import { blogs } from "#velite";
import { DetailedCard } from "@/components/Card";
import siteConfig from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `General | ${siteConfig.details.title}`,
  description:
    "Anything else besides programming and movies that interests me.",
};

const BlogPage = () => {
  const allPosts = blogs
    .filter((post) => post.published)
    .sort((a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate));

  return (
    <div className="mt-24">
      <h1 className="text-secondary-200 mb-8 font-bold">All Posts</h1>
      {allPosts.length > 0 ? (
        <ul>
          {allPosts.map((post) => (
            <li key={post.slug}>
              <DetailedCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p>
          There are no posts in this category yet. Please check back later 😉.
        </p>
      )}
    </div>
  );
};

export default BlogPage;
