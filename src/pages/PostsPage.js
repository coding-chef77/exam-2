import PostsList from "../components/PostsList";
import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, POSTS_URL } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import CommonButton from "../common/commonButton/CommonButton";
import { Container, Box, Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const url =
  BASE_URL + POSTS_URL + "?_author=true&_comments=true&_reactions=true";

export default function PostsPage() {
  const { auth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = useCallback(async () => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [auth.accessToken]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Container maxWidth="lg">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Link to="/newPost">
              <CommonButton variant="contained" sx={{ margin: "10px" }}>
                Create a Post
              </CommonButton>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PostsList posts={posts} />
          </Box>
        </>
      )}
    </Container>
  );
}
