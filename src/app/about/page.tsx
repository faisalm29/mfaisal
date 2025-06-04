import siteConfig from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About Me | ${siteConfig.details.title}`,
  description: "Here you can learn more about me.",
};

const About = () => {
  return (
    <div className="mt-24">
      <h1 className="text-secondary-200 mb-6 font-bold">About Me</h1>
      <ul className="ml-4">
        <li className="mb-4 list-disc">
          <p>Mulanya, saya adalah seoarng Content/Copywriter.</p>
        </li>
        <li className="mb-4 list-disc">
          <p>
            Setelah menjadi seorang Content/Copywriter, saya selanjutnya
            mempelajari digital marketing.
          </p>
        </li>
        <li className="mb-4 list-disc">
          <p>
            Web development, sudah menarik untuk saya semanjak saya masih SMA,
            namun tidak pernah belajar dengan serius. Awalnya, saya belajar PHP
            dan Python, namun setelah menemukan bahwa kami tidak perlu lagi
            menggunakan PHP untuk membangung backend, saya memutuskan langsung
            fokus belajar JavaScript.
          </p>
        </li>
        <li className="mb-4 list-disc">
          <p>
            Bisa dibilang, saya mulai belajar web development secara serius dua
            tahun ke belakang.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default About;
