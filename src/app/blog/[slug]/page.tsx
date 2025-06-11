import { notFound } from "next/navigation";
import { blogs } from "#velite";
import { MDXContent } from "@/components/MDXContent";
import { Metadata } from "next";
import { cache } from "react";
import { formatDate } from "../../../../lib/utils";
import type { ReadTimeResults } from "reading-time";
import TableOfContent from "@/components/TableOfContent";

interface BlogProps {
  params: Promise<{ slug: string }>;
}

const getPost = cache((slug: string) => {
  return blogs.find((blog) => blog.slug === "blog/".concat(slug));
});

export async function generateStaticParams() {
  return blogs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = getPost(slug);

  if (!blog) return {};

  return {
    title: `${blog.title} | General`,
    description: blog.summary,
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
