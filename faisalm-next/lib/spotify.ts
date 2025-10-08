import queryString from "query-string";
import { Track } from "@/types";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token.");
  }

  const data = await response.json();

  return data.access_token;
}

export async function getTopTracks(): Promise<{
  tracks: Track[];
  fetchedAt: string;
}> {
  const accessToken = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const { items } = await response.json();

  return {
    tracks: items,
    fetchedAt: new Date().toISOString(),
  };
}
