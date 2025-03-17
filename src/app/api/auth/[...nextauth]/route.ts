import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";


declare module "next-auth" {
  export interface Session {
    accessToken: string;
    userId: string;
    userName: string;
  }

  export interface JWT {
    accessToken: string;
     userId: string;
    userName: string;
  }
  export interface Profile {
    id: string;
    display_name: string;
    email?: string; 
    external_urls: {
      spotify: string;
    };
    followers: {
      total: number;
    };
    images: Array<{
      height: number;
      width: number;
      url: string;
    }>;
  }
}

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization:
      "https://accounts.spotify.com/authorize?scope=user-read-email,user-top-read&prompt=consent",
    
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // console.log("account", account);
        console.log("profile", profile);
        token.accessToken = account.access_token;
        token.userId = profile.id; // Spotify user ID
        token.userName = profile.display_name; // Spotify display name
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.userId = token.userId as string;
        session.userName = token.userName as string;
      }
      return session;
    },
    async signIn({ profile }) {
      console.log("signIn callback triggered");
      if (!profile) return false;
    
      await connectDB();
      console.log("Connected to DB");
    
      const updatedUserData = {
        displayName: profile.display_name,
        email: profile.email,
        profileUrl: profile.external_urls.spotify,
        followers: profile.followers.total,
        image: profile.images?.[0]?.url || "",
      };
    
      const existingUser = await User.findOneAndUpdate(
        { spotifyId: profile.id },
        updatedUserData,
        { new: true, upsert: true } // Create user if not found
      );
    
      console.log("User updated:", existingUser);
    
      return true;
    },
    
    

    async redirect({ url, baseUrl }) {
      console.log("Redirecting to:", url);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
