import Profile from "@/components/Profile";
import PostSectionWrapper from "@/components/PostSectionWrapper";
import Card from "@/components/Card";
import { allBlogs } from "content-collections";

export default function Home() {
  return (
    <>
      <Profile />
      <PostSectionWrapper>
        {allBlogs.map((post, id) => (
          <Card key={id} post={post} />
        ))}
      </PostSectionWrapper>
    </>
  );
}
