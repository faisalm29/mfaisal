import { allProgrammings } from "content-collections";
import { DetailedCard } from "@/components/Card";

const ProgrammingPage = () => {
  const sortedPosts = allProgrammings.sort(
    (a, b) =>
      Date.parse(b.publishedDate.toISOString()) -
      Date.parse(a.publishedDate.toISOString()),
  );
  return (
    <div className="mt-24">
      <h1 className="text-secondary-200 mb-8 font-bold">All Posts</h1>
      <ul>
        {sortedPosts.map((post, id) => (
          <li key={id}>
            <DetailedCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgrammingPage;
