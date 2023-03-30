import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import CircularProgress from "@mui/material/CircularProgress";
import { BASE_URL, POSTS_URL } from "../constants/api";
import Header from "../components/Header";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import UpdatePost from "../components/UpdatePost";
import ReactionEmoji from "../components/ReactionEmoji";
import DeleteButton from "../components/DeleteButton";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Box, Container, Paper, Typography } from "@mui/material";
import { BackButton } from "../common/BackButton";

const url = BASE_URL + POSTS_URL;

export default function SinglePostPage() {
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { postId } = useParams();

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const loadPost = async () => {
      fetch(
        `${url}/${postId}?_author=true&_comments=true&_reactions=true`,
        options
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setPost(data);
          setLoading(false);
        })
        .catch((error) => console.log(error.message));
    };
    loadPost();
  }, [postId]);

  return (
    <Container>
      <BackButton />
      <Box sx={{ maxWidth: 600, margin: "auto" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Paper>
            <Box padding={1}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                  alignItems: "flex-start",
                  gap: "20px",
                  marginBottom: "30px",
                }}
              >
                <Avatar
                  src={post.author.avatar}
                  alt="avatar"
                  sx={{ width: 56, height: 56 }}
                />
                <Box>
                  <Header subtitle2={post.author.name} />
                  <Typography
                    variant="body2"
                    mt={-4}
                    style={{ fontWeight: "bold" }}
                  >
                    {post.author.email}
                  </Typography>
                </Box>
              </Box>
              <Header subtitle1={post.title} />
              <Typography
                sx={{ wordWrap: "break-word" }}
                variant="body1"
                gutterBottom
                mb={4}
              >
                {post.body}
              </Typography>

              {post.media ? (
                <img
                  src={post.media}
                  alt="image from post"
                  style={{ maxWidth: "100%" }}
                />
              ) : null}
              <Typography variant="body2" mt={2}>
                This post has {post._count.reactions} like(s)
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <ReactionEmoji postId={postId} />
                {post.author.name === auth.name ? (
                  <DeleteButton postId={postId} />
                ) : null}
              </Box>
              {post.author.name === auth.name ? <UpdatePost /> : null}
              <AddCommentForm articleName={post.id} />
              {post.comments ? (
                <>
                  <CommentsList comments={post.comments} />
                </>
              ) : null}
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
