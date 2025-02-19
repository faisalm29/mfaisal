import Link from "next/link";
import { Bluesky, Github, Instagram } from "./Icon";

const otherPlatforms = [
  {
    name: "Bluesky",
    url: "https://bsky.app/",
    icon: <Bluesky />,
  },
  {
    name: "Github",
    url: "https://github.com/faisalm29",
    icon: <Github />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/faisalm29/",
    icon: <Instagram />,
  },
];

const Profile = () => {
  return (
    <div>
      <h1>Faisal M.</h1>
      <p>
        (tulis tentang blog ini)Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Officiis enim quas iste, voluptatem quisquam iure est.
        Veritatis dolorum eos recusandae, aliquid, laudantium accusamus laborum
        quo fugiat provident voluptate dolorem atque.
      </p>
      <div>
        <h2>Find me on another platform!</h2>
        {otherPlatforms.map((platform, id) => (
          <Link
            key={id}
            href={platform.url}
            title={platform.name}
            target="_blank"
          >
            {platform.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
