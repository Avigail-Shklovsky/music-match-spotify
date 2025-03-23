import mongoose, { Schema, Document } from "mongoose";

export interface ITrack extends Document {
  spotifyId: string;
  name: string;
  external_url: string;
  href: string;
  artists: string[];
  popularity: number;
  image: string;
  uri: string;
}

const TrackSchema = new Schema<ITrack>({
  spotifyId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  external_url: { type: String, required: true },
  href: { type: String, required: true },
  artists: [{ type: String }],
  popularity: { type: Number, required: true },
  uri: { type: String, required: true },
  image: { type: String },
});

const Track = mongoose.models.Artist || mongoose.model<ITrack>("Track", TrackSchema);
export default Track;
