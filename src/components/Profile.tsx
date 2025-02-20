import Link from "next/link";
import { RiBlueskyFill, RiGithubFill, RiInstagramFill } from "@remixicon/react";

const otherPlatforms = [
  {
    name: "Bluesky",
    url: "https://bsky.app/",
    icon: <RiBlueskyFill />,
  },
  {
    name: "Github",
    url: "https://github.com/faisalm29",
    icon: <RiGithubFill />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/faisalm29/",
    icon: <RiInstagramFill />,
  },
];

const Profile = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit
      </h1>
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
            className="inline-block"
          >
            {platform.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
