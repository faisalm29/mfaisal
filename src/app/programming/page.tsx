import { allProgrammings } from "content-collections";
import { DetailedCard } from "@/components/Card";

const ProgrammingPage = () => {
  const sortedPosts = allProgrammings.sort(
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

export default ProgrammingPage;
