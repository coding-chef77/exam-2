import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BASE_URL, POSTS_URL } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import { TextField, Typography, Button, Box } from "@mui/material";

const url = BASE_URL + POSTS_URL;

const schema = yup.object().shape({
  title: yup.string().required().min(3, "Title must be at least 3 characters."),
  body: yup
    .string()
    .required()
    .min(3, "Message must be minnimum 3 characters."),
  media: yup.string().url().optional(),
});

export default function UpdatePost() {
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [error, setError] = useState("");
  const { postId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };

    fetch(
      `${url}/${postId}?_author=true&_comments=true&_reactions=true`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
        return data;
      })
      .catch((error) => setError(error.message));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
      <Typography variant="h5">Update Post:</Typography>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          style={{ width: "300px", margin: "5px 0" }}
          label="Title"
          type="text"
          id="title"
          {...register("title")}
          error={errors.title ? true : false}
          helperText={errors.title?.message}
        />

        <TextField
          style={{ width: "300px", margin: "5px 0" }}
          multiline
          rows={4}
          label="Message"
          id="body"
          {...register("body")}
          error={errors.body ? true : false}
          helperText={errors.body?.message}
        />

        <TextField
          label="Image URL"
          style={{ width: "300px", margin: "5px 0" }}
          type="text"
          id="media"
          {...register("media")}
          error={errors.media ? true : false}
          helperText={errors.media?.message}
        />

        <Box sx={{ marginTop: "6px" }}>
          <Button type="submit" variant="contained">
            Update post
          </Button>
        </Box>
      </form>
    </Box>
  );
}
