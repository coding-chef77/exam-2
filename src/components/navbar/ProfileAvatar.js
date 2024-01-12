import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import { BASE_URL, PROFILE_URL } from "../../constants/api";

export default function ProfileAvatar() {
  const { auth } = useContext(AuthContext);
  const [profileAvatar, setProfileAvatar] = useState("");

  useEffect(() => {
    const fetchAvatar = async () => {
      const url = `${BASE_URL}${PROFILE_URL}/${auth.name}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setProfileAvatar(data.avatar);
      } catch (error) {
        console.error("Error fetching profile avatar:", error);
      }
    };

    if (auth) fetchAvatar();
  }, [auth]);

  return <Avatar alt="Profile Avatar" src={profileAvatar} />;
}
