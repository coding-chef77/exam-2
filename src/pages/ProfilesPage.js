import ProfilesList from "../components/ProfilesList";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect, useContext } from "react";
import { BASE_URL, PROFILE_URL } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import { Container, Alert } from "@mui/material";
import { BackButton } from "../common/BackButton";

const url = BASE_URL + PROFILE_URL;

export default function ProfilesPage() {
  const { auth } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const options = {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        };
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Failed to fetch profiles");
        setProfiles(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [auth.accessToken]);

  return (
    <Container>
      <BackButton />
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? <CircularProgress /> : <ProfilesList profiles={profiles} />}
    </Container>
  );
}
