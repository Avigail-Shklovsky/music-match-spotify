import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  spotifyId: String;
  displayName: String;
  email: String;
  profileUrl: String;
  followers: number;
  image: String;
  currentTopArtists:String[];
  currentTopTracks: String[];
}

const UserSchema = new Schema<IUser>({
  spotifyId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileUrl: { type: String, required: true },
  followers: { type: Number, default: 0 },
  image: { type: String },
  currentTopArtists:[{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
  currentTopTracks:[{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],

});

// Avoid model overwrite on hot reload
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
