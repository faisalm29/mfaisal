import { getTopTracks } from "../../../lib/spotify";
import Image from "next/image";
import siteConfig from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Chart | ${siteConfig.details.title}`,
  description: "My current Spotify heavy rotation. Updated daily.",
};

export const revalidate = 86400;

export default async function Chart() {
  const { tracks, fetchedAt } = await getTopTracks();

  return (
    <div className="mt-24">
      <div className="mb-8">
        <h1 className="text-secondary-200 mb-2 font-bold">Chart</h1>
        <p>My current Spotify heavy rotation. Updated daily.</p>
      </div>
      <ul className="mb-6">
        {tracks.map((track, number) => (
          <li
            key={track.id}
            className="border-secondary-400 border-b-1 pb-6 not-first:pt-6"
          >
            <a
              href={track.external_urls.spotify}
              target="_blank"
              className="group hover:text-accent flex flex-row items-start gap-8 transition-all duration-300 ease-in-out"
            >
              <div className="relative">
                <span className="group-hover:text-accent text-secondary-200 absolute transition-all duration-300 ease-in-out">
                  {number + 1}.
                </span>
              </div>
              <div className="flex w-full items-center justify-between gap-4">
                <div>
                  <p className="text-secondary-200 group-hover:text-accent mb-2 transition-all duration-300 ease-in-out">
                    {track.name}
                  </p>
                  <p>
                    {track.artists
                      .map((a: { name: string }) => a.name)
                      .join(", ")}
                  </p>
                </div>

                <Image
                  src={track.album.images[2].url}
                  alt={`${track.album.name}'s cover.`}
                  width={track.album.images[2].width}
                  height={track.album.images[2].height}
                  className="rounded"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
      <p>
        Last updated on{" "}
        {new Date(fetchedAt).toLocaleString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        .
      </p>
    </div>

    // <div className="mx-auto max-w-2xl p-6">
    //   <h1 className="text-2xl font-bold">My Top 10 Tracks</h1>
    //   <p className="text-muted-foreground mb-4 text-sm">
    //     Last updated: {new Date(fetchedAt).toLocaleString()}
    //   </p>
    //   <ul className="space-y-4">
    //     {tracks.map((track, i) => (
    //       <li key={track.id} className="flex items-center space-x-4">
    //         <span className="font-semibold">{i + 1}.</span>
    //         <Image
    //           src={track.album.images[2]?.url}
    //           alt={track.name}
    //           className="h-12 w-12 rounded"
    //           width={100}
    //           height={100}
    //         />
    //         <div>
    //           <p>{track.name}</p>
    //           <p className="text-muted-foreground text-sm">
    //             {track.artists.map((a: any) => a.name).join(", ")}
    //           </p>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// type Track = {
//   name: string;
//   artists: {
//     name: string;
//   }[];
//   album: {
//     name: string;
//     images: {
//       url: string;
//     }[];
//   };
//   external_urls: {
//     spotify: string;
//   };
// };

// export default function Charts() {
//   const [tracks, setTracks] = useState<Track[]>([]);

//   useEffect(() => {
//     const fetchTracks = async () => {
//       const res = await fetch("/api/spotify/get-top-tracks");
//       const data = await res.json();
//       setTracks(data);
//     };

//     fetchTracks();
//   }, []);

//   return (
//     <div className="mx-auto max-w-2xl p-6">
//       <h1 className="mb-4 text-2xl font-bold">What I'm Listening To 🎧</h1>
//       <ul className="space-y-4">
//         {tracks.map((track, index) => (
//           <li key={track.name + index} className="flex items-center gap-4">
//             <img
//               src={track.album.images[0]?.url}
//               alt={track.name}
//               className="h-16 w-16 rounded object-cover"
//             />
//             <div>
//               <p className="font-semibold">
//                 {index + 1}. {track.name}
//               </p>
//               <p className="text-sm text-gray-600">
//                 {track.artists.map((a) => a.name).join(", ")}
//               </p>
//               <a
//                 href={track.external_urls.spotify}
//                 target="_blank"
//                 className="text-sm text-blue-500"
//               >
//                 Open in Spotify →
//               </a>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
