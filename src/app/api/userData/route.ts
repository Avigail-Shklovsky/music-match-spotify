import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const getSpotifyData = async (accessToken: string) => {
  const [topTracks, topArtists] = await Promise.all([
    axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
    axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
  ]);
  return { topTracks: topArtists.data.items, topArtists: topTracks.data.items };
};

// Define the GET method explicitly
export async function GET(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  const accessToken = authorization?.split(" ")[1]; // Extract token

  if (!accessToken) {
    return NextResponse.json({ error: "Missing access token" }, { status: 400 });
  }

  try {
    const data = await getSpotifyData(accessToken);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data from Spotify " + error}, { status: 500 });
  }
}
