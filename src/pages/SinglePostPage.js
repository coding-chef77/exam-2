import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar, Box, Container, Paper, Typography } from "@mui/material";
import Header from "../components/Header";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import UpdatePost from "../components/UpdatePost";
import ReactionEmoji from "../components/ReactionEmoji";
import DeleteButton from "../components/DeleteButton";
import { AuthContext } from "../context/AuthContext";
import { BackButton } from "../common/BackButton";
import { BASE_URL, POSTS_URL } from "../constants/api";

const fetchPost = async (postId, accessToken) => {
  const url = `${
    BASE_URL + POSTS_URL
  }/${postId}?_author=true&_comments=true&_reactions=true`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default function SinglePostPage() {
  const { auth } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateKey, setUpdateKey] = useState(0);

  const { postId } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchPost(postId, auth.accessToken)
      .then((data) => {
        setPost(data);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [postId, auth.accessToken]);

  const handleNewComment = (newComment) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, newComment],
    }));
  };

  const handlePostUpdate = (updatedPost) => {
    setPost(updatedPost);
    setUpdateKey((prevKey) => prevKey + 1); // Increment the key to force re-render
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error loading post: {error}</Typography>;
  if (!post || !post.author)
    return <Typography>Post not found or incomplete data.</Typography>;
  const shouldDisplayUpdatePost = post && post.author.name === auth.name;

  return (
    <Container key={updateKey}>
      <BackButton />
      <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              src={post.author.avatar}
              alt="avatar"
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Box>
              <Header subtitle2={post.author.name} />
              <Typography variant="body2" mt={-4} sx={{ fontWeight: "bold" }}>
                {post.author.email}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>

          <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
            {post.body}
          </Typography>

          {post.media && (
            <Box sx={{ my: 2, textAlign: "center" }}>
              <img
                src={post.media}
                alt="Post Media"
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              justifyContent: "start",
              mb: 2,
            }}
          >
            <ReactionEmoji postId={postId} />
            {shouldDisplayUpdatePost && <DeleteButton postId={postId} />}
          </Box>

          {shouldDisplayUpdatePost && (
            <Box sx={{ mb: 3 }}>
              <UpdatePost post={post} onPostUpdate={handlePostUpdate} />
            </Box>
          )}

          <AddCommentForm
            articleName={post.id}
            onNewComment={handleNewComment}
          />

          <CommentsList comments={post.comments} />
        </Paper>
      </Box>
    </Container>
  );
}
