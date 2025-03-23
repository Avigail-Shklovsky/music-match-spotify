"use client";
import { SessionProvider } from "next-auth/react";
import AuthButton from "./AuthButton";
import Profile from "../userdata/UserData";

export  const AuthViaSpotify = () => {
    return (
        <div>
            <SessionProvider>
            Authenticate with Spotify
            <br />
            <AuthButton></AuthButton>
            <Profile></Profile>
            </SessionProvider>
        </div>
    )
}