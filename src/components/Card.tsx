import { styled } from "@pigment-css/react";
import Heading from "./Heading";
import Link from "next/link";
import type { Blog } from "content-collections";

const CardWrapper = styled("div")({
  padding: "16px",
  backgroundColor: "cyan",
  borderRadius: "8px",
});

const Card = ({ post }: { post: Blog }) => {
  return (
    <CardWrapper>
      <Heading text={post.title} />
      <p>{post.summary}</p>
      <Link href={post.slug}>Read more →</Link>
    </CardWrapper>
  );
};

export default Card;
