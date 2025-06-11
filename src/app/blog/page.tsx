// import { allBlogs } from "content-collections";
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
  const sortedPosts = blogs.sort(
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

export default BlogPage;

// import { allBlogs } from "content-collections";
// import { DetailedCard } from "@/components/Card";
// import siteConfig from "@/config";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: `General | ${siteConfig.details.title}`,
//   description:
//     "Anything else besides programming and movies that interests me.",
// };

// const BlogPage = () => {
//   const sortedPosts = allBlogs.sort(
//     (a, b) =>
//       Date.parse(b.publishedDate.toISOString()) -
//       Date.parse(a.publishedDate.toISOString()),
//   );

//   return (
//     <div className="mt-24">
//       <h1 className="text-secondary-200 mb-8 font-bold">All Posts</h1>
//       <ul>
//         {sortedPosts.map((post, id) => (
//           <li key={id}>
//             <DetailedCard post={post} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BlogPage;
