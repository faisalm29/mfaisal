import { NextResponse } from "next/server";
import queryString from "query-string";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const scope = "user-read-private user-read-email";
  const state = Math.random().toString(36).substring(2, 15);

  const authUrl =
    new URL("https://accounts.spotify.com/authorize?") +
    queryString.stringify({
      response_type: "code",
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      state,
    });

  console.log(authUrl);

  return NextResponse.redirect(authUrl.toString());
}
