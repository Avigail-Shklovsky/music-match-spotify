"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          onClick={() => signOut()}
        >
          Sign Out
        </button>{" "}
        <br />
      </div>
    );
  }

  return (
    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out" onClick={() => signIn("spotify")}>Sign In with Spotify</button>
  );
};

export default AuthButton;
