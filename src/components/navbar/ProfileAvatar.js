import { useState, useEffect, useContext } from "react";
import { BASE_URL, PROFILE_URL } from "../../constants/api";
import useLocalStorage from "../../hooks/useLocalStorage";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "@mui/material/Avatar";

export default function ProfileAvatar() {
  const [name, setName] = useLocalStorage("name");
  const [profileAvatar, setProfileAvatar] = useState("");
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;

  const url = BASE_URL + PROFILE_URL + `/${name}`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchAvatar = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch avatar");
      }
      const data = await response.json();
      setProfileAvatar(data.avatar);
    } catch (error) {
      console.error("Error fetching avatar:", error);
      // Handle the error appropriately here, e.g., show a message to the user.
    }
  };

  useEffect(() => {
    setName(auth.name);
    fetchAvatar();
  }, [name, accessToken]); // Added dependencies

  return <Avatar alt={`Avatar for ${name}`} src={profileAvatar} />;
}
