type SpotifyArtist = {
    external_urls: { spotify: string };
    followers: { href: string | null; total: number };
    genres: string[];
    href: string;
    id: string;
    images: { url: string; height: number; width: number }[];
    name: string;
    popularity: number;
    type: "artist";
    uri: string;
  };
  
  type SpotifyTrack = {
    album: {
      album_type: string;
      artists: SpotifyArtist[];
      available_markets: string[];
      external_urls: { spotify: string };
      href: string;
      id: string;
      images: { url: string; height: number; width: number }[];
      name: string;
      release_date: string;
      total_tracks: number;
      type: "album";
      uri: string;
    };
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: { isrc: string };
    external_urls: { spotify: string };
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: "track";
    uri: string;
  };
  
  export type SpotifyProfile = {
    topTracks: SpotifyTrack[];
    topArtists: SpotifyArtist[];
  };
  