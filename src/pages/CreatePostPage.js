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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setIsSubmitting(false);
  }, []);

  const onSubmit = (data) => {
    setIsSubmitting(true);
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
        setIsSubmitting(false);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <Container>
      <BackButton />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Header title="Create a Post" />
        <Typography variant="body1" sx={{ width: 300, mb: 2 }}>
          What's on your mind? Share ideas or challenges with other members.
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 300,
              gap: 2,
            }}
          >
            <TextField
              label="Title"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              {...register("body")}
              error={!!errors.body}
              helperText={errors.body?.message}
            />
            <TextField
              label="Image URL"
              {...register("media")}
              error={!!errors.media}
              helperText={errors.media?.message}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Create Post"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
