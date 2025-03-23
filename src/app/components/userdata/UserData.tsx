"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (session) {
      axios
        .get("/api/userData", {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        })
        .then((response) => {
          setProfileData(response.data);
          console.log(response.data);
          console.log("profile data:",profileData);
          
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [session]);
  

  if (!session) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div>
      {profileData && (
        <div>
            {/* <div>{profileData}</div> */}
          <h2>Your Top Artists</h2>
          {/* <ul>
            {profileData.topArtists.map((artist: any) => (
              <li key={artist.id}>{artist.name}</li>
            ))}
          </ul> */}
          <h2 >Your Top Tracks</h2>
          {/* <ul>
            {profileData.topTracks.map((track: any) => (
              <li key={track.id}>{track.name}</li>
            ))}
          </ul> */}
        </div>
      )}
    </div>
  );
};

export default Profile;
