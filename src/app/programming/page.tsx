import { allProgrammings } from "content-collections";
import Card from "@/components/Card";

const ProgrammingPage = () => {
  const sortedPosts = allProgrammings.sort(
    (a, b) =>
      Date.parse(b.publishedDate.toISOString()) -
      Date.parse(a.publishedDate.toISOString())
  );
  return (
    <>
      {sortedPosts.map((post, id) => (
        <Card key={id} post={post} />
      ))}
    </>
  );
};

export default ProgrammingPage;
