import ProfilesList from "../components/ProfilesList";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect, useContext } from "react";
import { BASE_URL, PROFILE_URL } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import { Container, Box } from "@mui/material";
import { BackButton } from "../common/BackButton";

const url = BASE_URL + PROFILE_URL;

export default function ProfilesPage() {
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (!auth) {
        throw new Error("No auth token found in localStorage");
      }
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setProfiles(data);
          setLoading(false);
        })
        .catch((error) => console.log(error.message));
    } catch (e) {
      console.log(e.message);
    }
  }, [auth]);

  return (
    <Container>
      <BackButton />
      <Box
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          {loading ? (
            <CircularProgress />
          ) : (
            <ProfilesList profiles={profiles} />
          )}
        </Box>
      </Box>
    </Container>
  );
}
