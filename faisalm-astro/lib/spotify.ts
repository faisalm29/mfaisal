const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Spotify token error:", err);
    throw new Error("Failed to refresh token.");
  }

  const data = await response.json();

  return data.access_token;
}

export async function getTopTracks(): Promise<
  Array<{
    url: string;
    name: string;
    artists: Array<{
      name: string;
    }>;
    album: {
      image: {
        url: string;
        width: number;
        height: number;
      };
      name: string;
    };
  }>
> {
  const accessToken = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const { items } = await response.json();

  const tracks = items.map((track: Spotify.Track) => ({
    url: track.external_urls.spotify,
    name: track.name,
    artists: track.artists,
    album: {
      image: {
        url: track.album.images[2].url,
        width: track.album.images[2].width,
        height: track.album.images[2].height,
      },
      name: track.album.name,
    },
  }));

  return tracks;
}
