"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SpotifyProfile } from "next-auth/providers/spotify";

const Profile = () => {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState<SpotifyProfile>();

  useEffect(() => {
    // console.log("Session data:", session);
    
    if (session) {
      console.log("Fetching data with token:", session.accessToken);

      axios
        .get(`/api/userData`, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        })
        .then((response) => {
          setProfileData(response.data);
          // console.log(response.data);
          console.log("profile data:",profileData);
          
        })
        .catch((error) =>      console.error("Error fetching data:", error.response?.data || error.message)
      );
    }
  }, [session]);
  

  if (!session) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div>
      {profileData && (
        <div>
          <h2>data fetched</h2>         
        </div>
      )}
    </div>
  );
};

export default Profile;
