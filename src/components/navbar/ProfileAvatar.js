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

  useEffect(() => {
    setName(auth.name);
  }, [auth.name, setName]);

  const url = BASE_URL + PROFILE_URL + `/${name}`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchAvatar = async () => {
    const response = await fetch(url, options);
    const data = await response.json();

    setProfileAvatar(data.avatar);
  };

  useEffect(() => {
    fetchAvatar();
  });

  return <Avatar alt="profile avatar" src={profileAvatar} />;
}
