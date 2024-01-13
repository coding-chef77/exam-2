import { useState, useEffect, useContext } from "react";
import { BASE_URL, PROFILE_URL } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  Container,
  Paper,
  Box,
  Avatar,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import Header from "../components/Header";
import CommonButton from "../common/commonButton/CommonButton";
import { buttonStyles } from "../common/commonButton/buttonStyles";
import { BackButton } from "../common/BackButton";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProfilePage() {
  const [name, setName] = useLocalStorage("name");
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setName(auth.name);
  }, []);

  const url = `${BASE_URL}${PROFILE_URL}/${auth.name}`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const getProfileData = async () => {
    const response = await fetch(url, options);
    const data = await response.json();

    setProfileData(data);
    setLoading(false);
  };

  useEffect(() => {
    getProfileData();
  }, [name]);

  return (
    <Container>
      <BackButton />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper sx={{ width: "100%", borderRadius: 0 }}>
            <Box
              sx={{
                backgroundImage: `url(${profileData.banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "25vh",
              }}
              alt="banner image"
            />
            <Box sx={{ padding: { xs: "5px", md: "30px" } }}>
              <Stack
                sx={{
                  paddingTop: "5px",
                  marginBottom: "10px",
                }}
              >
                <Avatar
                  alt="avatar"
                  src={profileData.avatar}
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
                <Header title={profileData.name} />
                <Header subtitle2={profileData.email} />
              </Box>
              <Typography color="textPrimary" variant="body1" gutterBottom>
                Stats:
              </Typography>
              {profileData._count &&
                (profileData._count.posts !== 0 ||
                  profileData._count.followers !== 0 ||
                  profileData._count.following !== 0) && (
                  <>
                    <Typography variant="body2" gutterBottom>
                      You have created: {profileData._count.posts} post(s)
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      You have: {profileData._count.followers} follower(s)
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      You follow: {profileData._count.following} other member(s)
                    </Typography>
                  </>
                )}
              <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="center"
                paddingTop={2}
                gap={2}
              >
                <CommonButton variant="contained" sx={buttonStyles}>
                  <div
                    onClick={() => {
                      window.location.href = "/myprofile/:myprofileId";
                    }}
                  >
                    Edit profile
                  </div>
                </CommonButton>
                <CommonButton variant="contained" sx={buttonStyles}>
                  <div
                    onClick={() => {
                      window.location.href = "/profiles";
                    }}
                  >
                    Other profiles
                  </div>
                </CommonButton>
              </Grid>
            </Box>
          </Paper>
        </>
      )}
    </Container>
  );
}
