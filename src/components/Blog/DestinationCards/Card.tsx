import Image from "next/image";

interface CardProps {
  name: string;
  description: string;
  img: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

const Card = ({ name, description, img }: CardProps) => {
  img: {
  }
  return (
    <div className="not-prose max-h-fit min-h-[576px] w-full rounded bg-white p-4 sm:max-h-fit sm:min-h-[224px] sm:p-2">
      <div className="relative mb-3 h-72 w-full sm:h-28">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          style={{ objectFit: "cover" }}
          className="rounded"
        />
      </div>
      <p className="text-primary mb-2 text-4xl font-bold sm:text-xl">{name}</p>
      <div className="text-surface">{description}</div>
    </div>
  );
};

export default Card;
