import Link from "next/link";
import AnchorLink from "./AnchorLink";
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
            Hello, Faisal here! I'm just an ordinary person with an interest in
            writing and web development. I created this blog as a record and to
            implement the learning that I have gone through on web development.
            My journey in learning web development and what I am adding to this
            blog can be found in the{" "}
            <AnchorLink href="/programming">code</AnchorLink> section. The rest
            can be found in the <AnchorLink href="/blog">general</AnchorLink>{" "}
            and <AnchorLink href="/movie">movies</AnchorLink> section for what
            interests me.
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
