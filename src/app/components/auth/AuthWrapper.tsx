"use client";
import { SessionProvider } from "next-auth/react";
import AuthButton from "./AuthButton";

export  const AuthViaSpotify = () => {
    return (
        <div>
            <SessionProvider>
            Authenticate with Spotify
            <br />
            <AuthButton></AuthButton>
            </SessionProvider>
        </div>
    )
}