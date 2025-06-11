import { programmings } from "#velite";
import { DetailedCard } from "@/components/Card";
import siteConfig from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Programming | ${siteConfig.details.title}`,
  description:
    "Here, I write about what I have been learning lately in programming and how I have implemented it on this website.",
};

const ProgrammingPage = () => {
  const sortedPosts = programmings.sort(
    (a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate),
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
