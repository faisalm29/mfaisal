import { allBlogs } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";

const BlogPage = () => {
  return (
    <>
      {allBlogs.map((blog, id) => (
        <div key={id}>
          <h1>{blog.title}</h1>
          <p>{blog.summary}</p>
          <MDXContent code={blog.mdx} />
        </div>
      ))}
    </>
  );
};

export default BlogPage;
