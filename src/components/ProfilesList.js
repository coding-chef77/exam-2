import {
  Avatar,
  Card,
  CardContent,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function ProfilesList({ profiles }) {
  return (
    <Container>
      <Header title="Members list" />
      {profiles &&
        profiles.map((profile) => (
          <Link
            key={profile.name}
            to={`/profiles/${profile.name}`}
            sx={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                width: { xs: "100%", md: "450px" },
                marginBottom: "20px",
                ":hover": {
                  boxShadow: 10,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ width: 80 }}>
                    {profile.avatar ? (
                      <Avatar
                        src={profile.avatar}
                        alt="avatar"
                        sx={{ width: 56, height: 56 }}
                      />
                    ) : null}
                  </Box>
                  <Box>
                    <Header subheading={profile.name} />
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ mt: -4, mb: 6 }}
                    >
                      {profile.email}
                    </Typography>
                  </Box>
                </Box>
                {profile._count &&
                  (profile._count.posts !== 0 ||
                    profile._count.followers !== 0 ||
                    profile._count.following !== 0) && (
                    <>
                      <Typography variant="body1">
                        {profile.name} has created: {profile._count.posts}{" "}
                        post(s).
                      </Typography>
                      <Typography variant="body1">
                        {profile.name} has: {profile._count.followers}{" "}
                        follower(s).
                      </Typography>
                      <Typography variant="body1">
                        {profile.name} follows: {profile._count.following} other
                        member(s).
                      </Typography>
                    </>
                  )}
              </CardContent>
            </Card>
          </Link>
        ))}
    </Container>
  );
}
