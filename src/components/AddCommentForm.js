import React, { useContext, useState } from "react";
import { BASE_URL, POSTS_URL } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import { Box, TextField, Typography, Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const url = BASE_URL + POSTS_URL;

const schema = yup.object().shape({
  body: yup
    .string()
    .required("Comment is required")
    .min(4, "Comment is too short"),
});

export default function AddCommentForm({ articleName, onNewComment }) {
  const { auth } = useContext(AuthContext);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const requestBody = { body: data.body };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(`${url}/${articleName}/comment`, options);
      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }
      const newComment = await response.json();
      onNewComment(newComment); // Pass new comment back to the parent component
      reset(); // Clear the form after successful submission
    } catch (error) {
      console.error(error);
      setSubmitError("An error occurred while submitting the comment.");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
        <Typography variant="h4">Add a Comment:</Typography>
        {submitError && <Typography color="error">{submitError}</Typography>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            style={{ maxWidth: "250px", margin: "5px 0" }}
            {...register("body")}
            id="body"
            label="Comment"
            multiline
            rows={4}
            error={Boolean(errors.body)}
            helperText={errors.body?.message}
          />
          <Box sx={{ marginTop: "6px" }}>
            <Button type="submit" variant="contained">
              Submit Comment
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
