import { styled } from "@pigment-css/react";
import Heading from "../Heading";
import Link from "next/link";

interface Post {
  title: string;
  publishedDate: Date;
  category: string;
  slug: string;
}

const CardWrapper = styled("div")({
  padding: "16px",
  backgroundColor: "cyan",
  borderRadius: "8px",
});

const PlainCard = ({ post }: { post: Post }) => {
  return (
    <CardWrapper>
      <Heading text={post.title} />
      <Link href={post.slug}>Read more →</Link>
    </CardWrapper>
  );
};

export default PlainCard;
