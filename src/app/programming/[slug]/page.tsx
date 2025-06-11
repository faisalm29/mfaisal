import { notFound } from "next/navigation";
import { programmings } from "#velite";
import { MDXContent } from "@/components/MDXContent";
import { Metadata } from "next";
import { cache } from "react";
import { formatDate } from "../../../../lib/utils";
import type { ReadTimeResults } from "reading-time";
import TableOfContent from "@/components/TableOfContent";

interface ProgrammingProps {
  params: Promise<{ slug: string }>;
}

const getPost = cache((slug: string) => {
  return programmings.find(
    (programming) => programming.slug === "programming/".concat(slug),
  );
});

export async function generateStaticParams() {
  return programmings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProgrammingProps): Promise<Metadata> {
  const { slug } = await params;

  const post = getPost(slug);

  if (!post) return {};

  return {
    title: `${post.title} | General`,
    description: post.summary,
  };
}

export default async function GeneralPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const readingTime = JSON.parse(post.readingTime) as ReadTimeResults;

  return (
    <div className="mx-auto max-w-[65ch] lg:grid lg:max-w-5xl lg:grid-cols-12">
      <article className="prose prose-p:text-secondary-400 prose-a:no-underline prose-li:text-secondary-400 prose-strong:text-secondary-200 prose-th:text-secondary-200 prose-td:text-secondary-400 checked:bg-accent prose-tr:even:bg-[#172135] prose-tr:odd:bg-primary mt-10 marker:text-gray-500 lg:col-span-8">
        <div className="flex">
          <time className="not-prose text-secondary-400 mr-2">
            {formatDate(post.publishedDate)}
          </time>
          •
          <p className="not-prose text-secondary-400 ml-2 capitalize">
            {readingTime.text}
          </p>
        </div>
        <h1 className="not-prose text-secondary-200 mt-[0.6em] mb-[0.6em] font-bold">
          {post.title}
        </h1>

        <MDXContent code={post.code} />
      </article>

      <TableOfContent />
    </div>
  );
}

// import { allProgrammings } from "content-collections";
// import { MDXContent } from "@content-collections/mdx/react";
// import MDXContainer from "@/components/MDXContainer";
// import { notFound } from "next/navigation";
// import type { ReadTimeResults } from "reading-time";
// import TableOfContent from "@/components/TableOfContent";
// import type { Metadata } from "next";
// import { cache } from "react";

// type Props = {
//   params: Promise<{ slug: string }>;
// };

// const getPost = cache((slug: string) => {
//   return allProgrammings.find(
//     (post) =>
//       post.category.concat("/", post._meta.path) ===
//       post.category.concat("/", slug),
//   );
// });

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { slug } = await params;

//   const post = getPost(slug);

//   return {
//     title: `${post!.title} | Programming`,
//     description: post!.summary,
//   };
// }

// export async function generateStaticParams() {
//   return allProgrammings.map((post) => ({
//     slug: post.category.concat("/", post._meta.path),
//   }));
// }

// export default async function Programming({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;

//   const post = getPost(slug);

//   if (!post) {
//     notFound();
//   }

//   const readingTime = JSON.parse(post.readingTime) as ReadTimeResults;

//   return (
//     <div className="mx-auto max-w-[65ch] lg:grid lg:max-w-5xl lg:grid-cols-12">
//       <article className="prose prose-p:text-secondary-400 prose-a:no-underline prose-li:text-secondary-400 prose-strong:text-secondary-200 prose-code:text-secondary-400 prose-th:text-secondary-200 prose-td:text-secondary-400 checked:bg-accent prose-code:ps-0 prose-tr:even:bg-[#172135] prose-tr:odd:bg-primary mx-auto mt-10 marker:text-gray-500 lg:col-span-8">
//         <div className="flex">
//           <time className="not-prose text-secondary-400 mr-2">
//             {post.publishedDate.toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//             })}
//           </time>
//           •
//           <p className="not-prose text-secondary-400 ml-2 capitalize">
//             {readingTime.text}
//           </p>
//         </div>
//         <h1 className="not-prose text-secondary-200 mt-[0.6em] mb-[0.6em] font-bold">
//           {post.title}
//         </h1>

//         <MDXContent code={post.body} components={MDXContainer} />
//       </article>

//       <TableOfContent />
//     </div>
//   );
// }
