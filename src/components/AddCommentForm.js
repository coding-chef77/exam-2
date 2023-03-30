import { useState, useContext } from "react";
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

export default function AddCommentForm({ articleName }) {
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [comments, setComments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const requestBody = {
      body: data.body,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    };

    fetch(`${url}/${articleName}/comment`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit comment");
        }
        return response.json();
      })
      .then((data) => {
        setComments([...comments, data]);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
        <Typography variant="h5">Add a Comment:</Typography>
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
      <Box>
        {comments.map((comment) => (
          <Box key={comment.id}>{comment.body}</Box>
        ))}
      </Box>
    </>
  );
}
