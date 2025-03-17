"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <button onClick={() => signOut()}>Sign Out</button>{" "}
        <br />
      </div>
    );
  }

  return (
    <button onClick={() => signIn("spotify")}>Sign In with Spotify</button>
  );
};

export default AuthButton;
