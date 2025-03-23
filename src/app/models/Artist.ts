import mongoose, { Schema, Document } from "mongoose";

export interface IArtist extends Document {
  spotifyId: string;
  name: string;
  external_url: string;
  href: string;
  genres: string[];
  followers: number;
  popularity: number;
  image: string;
  uri: string;
}

const ArtistSchema = new Schema<IArtist>({
  spotifyId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  external_url: { type: String, required: true },
  href: { type: String, required: true },
  genres: [{ type: String }],
  followers: { type: Number, required: true },
  popularity: { type: Number, required: true },
  uri: { type: String, required: true },
  image: { type: String },
});

const Artist = mongoose.models.Artist || mongoose.model<IArtist>("Artist", ArtistSchema);
export default Artist;
