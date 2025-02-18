import { styled } from "@pigment-css/react";
import Heading from "./Heading";

const CardWrapper = styled("div")({
  padding: "16px",
  backgroundColor: "cyan",
  borderRadius: "8px",
});

const Card = () => {
  return (
    <CardWrapper>
      <Heading text="Lah, ini mah judul!" />
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati ut
        voluptatum animi, aliquid harum non nam excepturi fugit recusandae!
        Beatae, obcaecati.
      </p>
    </CardWrapper>
  );
};

export default Card;
