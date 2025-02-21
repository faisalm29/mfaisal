import Link from "next/link";
import { RiBlueskyFill, RiGithubFill, RiInstagramFill } from "@remixicon/react";

const otherPlatforms = [
  {
    name: "Bluesky",
    url: "https://bsky.app/",
    icon: <RiBlueskyFill size={32} />,
  },
  {
    name: "Github",
    url: "https://github.com/faisalm29",
    icon: <RiGithubFill size={32} />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/faisalm29/",
    icon: <RiInstagramFill size={32} />,
  },
];

const Profile = () => {
  return (
    <div className="my-24">
      <div className="md:grid md:grid-cols-8 lg:grid-cols-12">
        <h1 className="text-secondary-200 mb-3 font-bold md:col-span-2 lg:col-span-4">
          Faisal M.
        </h1>

        <div className="md:col-span-6 md:ml-6 lg:col-span-8 lg:ml-0">
          <p className="mb-8 pt-2">
            (tulis tentang blog ini)Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Officiis enim quas iste, voluptatem quisquam iure
            est. Veritatis dolorum eos recusandae, aliquid, laudantium accusamus
            laborum quo fugiat provident voluptate dolorem atque.
          </p>
          <div>
            {otherPlatforms.map((platform, id) => (
              <Link
                key={id}
                href={platform.url}
                title={platform.name}
                target="_blank"
                className="hover:text-secondary-200 mr-4 inline-block transition-colors duration-300 ease-in-out last:mr-0"
              >
                {platform.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
