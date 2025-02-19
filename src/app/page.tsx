import Profile from "@/components/Profile";
import PostSectionWrapper from "@/components/PostSectionWrapper";
import { PlainCard } from "@/components/Card";
import { allBlogs, allProgrammings } from "content-collections";

export default function Home() {
  const allContents = allBlogs
    .map((post) => ({
      title: post.title,
      publishedDate: post.publishedDate,
      category: post.category,
      slug: post.slug,
    }))
    .concat(
      allProgrammings.map((post) => ({
        title: post.title,
        publishedDate: post.publishedDate,
        category: post.category,
        slug: post.slug,
      }))
    );

  const sortedContents = allContents.sort(
    (a, b) =>
      Date.parse(b.publishedDate.toISOString()) -
      Date.parse(a.publishedDate.toISOString())
  );

  return (
    <>
      <Profile />
      <PostSectionWrapper>
        {sortedContents.map((content, id) => (
          <PlainCard key={id} post={content} />
        ))}
      </PostSectionWrapper>
    </>
  );
}
