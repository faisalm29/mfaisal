import { NextResponse } from "next/server";
import queryString from "query-string";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  // const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      // code: code!,
      // redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok) {
    return NextResponse.json({ error: tokenData }, { status: tokenRes.status });
  }

  return NextResponse.json(tokenData);
  // return NextResponse.redirect(
  //   `http://localhost:3000/chart?access_token=${tokenData.access_token}`,
  // );
}
