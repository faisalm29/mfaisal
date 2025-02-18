import { styled } from "@pigment-css/react";

const HeadingWrapper = styled("h1")(({ theme }) => ({
  fontFamily: theme.fontFamily,
  fontWeight: "700",
}));

const Heading = ({ text }: { text: string }) => {
  return <HeadingWrapper>{text}</HeadingWrapper>;
};

export default Heading;
