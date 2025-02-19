import { allBlogs } from "content-collections";
import { DetailedCard } from "@/components/Card";

const BlogPage = () => {
  const sortedPosts = allBlogs.sort(
    (a, b) =>
      Date.parse(b.publishedDate.toISOString()) -
      Date.parse(a.publishedDate.toISOString())
  );

  return (
    <>
      {sortedPosts.map((post, id) => (
        <DetailedCard key={id} post={post} />
      ))}
    </>
  );
};

export default BlogPage;
