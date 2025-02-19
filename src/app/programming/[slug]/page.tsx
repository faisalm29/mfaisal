import { allProgrammings } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { notFound } from "next/navigation";
import type { ReadTimeResults } from "reading-time";

export async function generateStaticParams() {
  return allProgrammings.map((post) => ({
    slug: post.category.concat("/", post._meta.path),
  }));
}

export default async function Programming({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = allProgrammings.find(
    (post) => post.slug === post.category.concat("/", slug)
  );

  if (!post) {
    notFound();
  }

  const readingTime = JSON.parse(post.readingTime) as ReadTimeResults;

  return (
    <article>
      <h1>{post.title}</h1>
      <MDXContent code={post.mdx} />
      <div>
        <time>
          {post.publishedDate.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <p>{readingTime.text}</p>
      </div>
    </article>
  );
}
