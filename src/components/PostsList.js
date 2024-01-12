import { Link } from "react-router-dom";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import Header from "../components/Header";

export default function PostsList({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/posts/${post.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "flex-start",
              gap: { xs: 0, md: "40px" },
              margin: "10px 0",
              padding: "5px",
              ":hover": { boxShadow: 10 },
              bgcolor: "background.main",
            }}
          >
            <Box sx={{ width: "100px", margin: "10px" }}>
              <Avatar
                alt={`Avatar of ${post.author.name}`}
                src={post.author.avatar}
              />
              <Header subtitle2={post.author.name} />
            </Box>
            <CardContent
              sx={{
                width: { xs: "80vw", md: "400px" },
                mt: { xs: "20px", md: "0" },
                ml: { xs: "0", md: "20px" },
                wordWrap: "break-word",
              }}
            >
              <Header subtitle1={post.title} />
              <Typography variant="body1">
                {post.body
                  ? post.body.length > 120
                    ? `${post.body.substring(0, 120)}...`
                    : post.body
                  : "No content available."}
              </Typography>
              {post.media && (
                <img
                  src={post.media}
                  alt={post.title}
                  style={{ maxWidth: "100%" }}
                />
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
