import siteConfig from "@/config";
import type { Metadata } from "next";
import Changelogs from "@/components/Changelogs";
import AnchorLink from "@/components/AnchorLink";

export const metadata: Metadata = {
  title: `About Me | ${siteConfig.details.title}`,
  description: "Here you can learn more about me.",
};

const About = () => {
  return (
    <div className="mt-24">
      <section className="mb-24">
        <h1 className="text-secondary-200 mb-6 font-bold">About This Blog</h1>
        <ul className="ml-4">
          <li className="mb-4 list-disc">
            <p>
              This blog was built mainly for me to implement what I&apos;ve been
              learning in web development.
            </p>
          </li>
          <li className="mb-4 list-disc">
            <p>
              I also love writing. Currently I&apos;m learning English myself.
              To practice my English, I&apos;ll mainly write posts in English.
            </p>
          </li>
          <li className="mb-4 list-disc">
            <p>
              If you spot any grammatical errors or typos in this blog, please
              let me know! You can contact me through one of the social media
              links listed on the home page, and I&apos;ll fix them.
            </p>
          </li>
          <li className="mb-4 list-disc">
            <p>
              This blog is a long-term project. There&apos;s a lot I want to add
              to this blog. Check the{" "}
              <AnchorLink href="#changelogs">Changelogs</AnchorLink> section
              below for updates on what I&apos;ve added.
            </p>
          </li>
        </ul>
      </section>
      <section id="changelogs">
        <Changelogs />
      </section>
    </div>
  );
};

export default About;
