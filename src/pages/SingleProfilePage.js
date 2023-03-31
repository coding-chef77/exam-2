import { useState, useEffect, useContext, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { BASE_URL, PROFILE_URL } from "../constants/api";
import FollowUnfollow from "../components/FollowUnfollow";
import { AuthContext } from "../context/AuthContext";
import {
  Avatar,
  Container,
  Stack,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { BackButton } from "../common/BackButton";
import Header from "../components/Header";

const url = BASE_URL + PROFILE_URL + "/";

export default function SingleProfilePage() {
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const { profileName } = useParams();

  const handleFollowUnfollow = useCallback(() => {
    setRefetch((prevRefetch) => !prevRefetch);
  }, []);

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const loadProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}${profileName}`, options);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadProfile();
  }, [profileName, refetch, accessToken]);
  return (
    <Container>
      <BackButton />
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper>
          {profile.banner ? (
            <Box
              sx={{
                backgroundImage: `url(${profile.banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "25vh",
              }}
              alt="banner image"
            />
          ) : (
            <Box
              sx={{
                backgroundColor: "lightgrey",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "25vh",
              }}
            />
          )}
          <Box sx={{ padding: { xs: "10px", md: "30px" } }}>
            <Stack
              sx={{
                paddingTop: "10px",
                marginBottom: "10px",
              }}
            >
              <Avatar
                src={profile.avatar}
                alt="avatar"
                sx={{ width: 65, height: 65 }}
              />
            </Stack>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                "& > * + *": {
                  marginTop: -5,
                },
              }}
            >
              <Header title={profile.name} />
              <Header subtitle2={profile.email} />
            </Box>
            {profile._count &&
              (profile._count.posts !== 0 ||
                profile._count.followers !== 0 ||
                profile._count.following !== 0) && (
                <>
                  <Typography variant="body2">
                    {profile.name} has created: {profile._count.posts} post(s).
                  </Typography>
                  <Typography variant="body2">
                    {profile.name} has: {profile._count.followers} follower(s).
                  </Typography>
                  <Typography variant="body2">
                    {profile.name} follows: {profile._count.following} other
                    member(s).
                  </Typography>
                  <Box sx={{ marginTop: "20px" }}>
                    <FollowUnfollow
                      profileName={profileName}
                      handleFollowUnfollow={handleFollowUnfollow}
                    />
                  </Box>
                </>
              )}
          </Box>
        </Paper>
      )}
    </Container>
  );
}
