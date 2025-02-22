import { allBlogs } from "content-collections";
import { useMDXComponent } from "@content-collections/mdx/react";
import MDXContainer from "@/components/MDXContainer";
import { notFound } from "next/navigation";
import type { ReadTimeResults } from "reading-time";

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.category.concat("/", post._meta.path),
  }));
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = allBlogs.find(
    (post) =>
      post.category.concat("/", post._meta.path) ===
      post.category.concat("/", slug),
  );

  if (!post) {
    notFound();
  }

  const readingTime = JSON.parse(post.readingTime) as ReadTimeResults;

  const Component = useMDXComponent(post.body);

  return (
    <article className="prose prose-p:text-secondary-400 prose-a:no-underline mx-auto mt-10">
      <div className="flex">
        <time className="not-prose text-secondary-400 mr-2">
          {post.publishedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        •
        <p className="not-prose text-secondary-400 ml-2 capitalize">
          {readingTime.text}
        </p>
      </div>
      <h1 className="not-prose text-secondary-200 mt-[0.6em] mb-[0.6em] font-bold">
        {post.title}
      </h1>

      <Component components={MDXContainer} />
    </article>
  );
}
