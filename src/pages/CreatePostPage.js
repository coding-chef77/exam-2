import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, POSTS_URL } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import {
  TextField,
  Container,
  Box,
  Alert,
  Button,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import { BackButton } from "../common/BackButton";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CircularProgress from "@mui/material/CircularProgress";

const url = BASE_URL + POSTS_URL;

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required.")
    .min(3, "Title must be at least 3 characters."),
  body: yup
    .string()
    .required("Message is required.")
    .min(3, "Message must be minimum 3 characters."),
  media: yup.string().url(),
});

export default function CreatePostPage() {
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const onSubmit = (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        navigate("/posts");
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <Container>
      <BackButton />
      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Header title={"Create a Post"} />
          <Typography
            variant="body1"
            style={{ width: "300px", marginBottom: "5px" }}
          >
            What's on your mind? Share ideas or challenges with other members
          </Typography>

          {error && (
            <Alert variant="outlined" severity="error">
              <strong>{error}</strong>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                style={{ width: "300px", margin: "5px 0" }}
                label="Title"
                type="text"
                id="title"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              <TextField
                style={{ width: "300px", margin: "5px 0" }}
                label="Message"
                multiline
                rows={4}
                id="body"
                {...register("body")}
                error={!!errors.body}
                helperText={errors.body?.message}
              />

              <TextField
                style={{ width: "300px", margin: "5p 0" }}
                label="Image URL"
                type="text"
                id="media"
                {...register("media")}
                error={!!errors.media}
                helperText={errors.media?.message}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              style={{ margin: "10px 0" }}
            >
              Create Post
            </Button>
          </form>
        </Box>
      )}
    </Container>
  );
}
