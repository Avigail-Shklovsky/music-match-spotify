import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  spotifyId: string;
  displayName: string;
  email: string;
  profileUrl: string;
  followers: number;
  image: string;
}

const UserSchema = new Schema<IUser>({
  spotifyId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileUrl: { type: String, required: true },
  followers: { type: Number, default: 0 },
  image: { type: String },
});

// Avoid model overwrite on hot reload
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
