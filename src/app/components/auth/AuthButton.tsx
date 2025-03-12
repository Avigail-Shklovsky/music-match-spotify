'use client'
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return <button onClick={() => signOut()}>Sign Out</button>;
  }

  return <button onClick={() => signIn("spotify")}>Sign In with Spotify</button>;
};

export default AuthButton;
