import Card from "./Card";

const destinations = [
  {
    name: "Kamakura",
    description: "Small city full of historic treasures.",
    img: {
      src: "/kamakura.jpg",
      alt: "Scenic Kamakura City Tram",
      width: 500,
      height: 500,
    },
  },
  {
    name: "Kyoto",
    description: "For over 1000 years the capital of Japan.",
    img: {
      src: "/kyoto.jpg",
      alt: "Red and Black Temple Surrounded by Trees Photo",
      width: 500,
      height: 500,
    },
  },
  {
    name: "Osaka",
    description: "Largest city of the Kinki Region.",
    img: {
      src: "/osaka.jpg",
      alt: "White and Green Osaka Castle",
      width: 500,
      height: 500,
    },
  },
];

const DestinationCards = () => {
  return (
    <div className="not-prose border-secondary-200 rounded border-[1px] p-4">
      <h1 className="text-secondary-200 mb-6 font-bold">
        Top Destinations in Japan
      </h1>
      <p className="text-secondary-400 mb-4">
        This is Japan&apos;s top destination by{" "}
        <a
          href="https://www.japan-guide.com/e/e623a.html"
          target="_blank"
          className="text-accent"
        >
          japan-guide.com.
        </a>
      </p>
      <ul className="grid grid-cols-1 grid-rows-[auto] gap-4 sm:grid-cols-3">
        {destinations.map((destination, id) => (
          <li className="list-none" key={id}>
            <Card
              name={destination.name}
              description={destination.description}
              img={destination.img}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DestinationCards;
