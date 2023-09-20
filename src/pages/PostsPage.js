import PostsList from "../components/PostsList";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, POSTS_URL } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import CommonButton from "../common/commonButton/CommonButton";
import { Container, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const url =
  BASE_URL + POSTS_URL + "?_author=true&_comments=true&_reactions=true";

export default function PostsPage() {
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [posts, setPosts] = useState([]);
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
          setPosts(data);
          setLoading(false);
        })
        .catch((error) => console.log(error.message));
    } catch (e) {
      console.log(e.message);
    }
  }, [accessToken, auth]);

  return (
    <Container maxWidth="lg">
      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Link to="/newPost">
            <CommonButton variant="contained" sx={{ margin: "10px" }}>
              Create a post!
            </CommonButton>
          </Link>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PostsList posts={posts} />
      </Box>
    </Container>
  );
}
