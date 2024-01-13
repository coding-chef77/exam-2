import { BASE_URL, POSTS_URL } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../common/commonButton/CommonButton";
import { buttonStyles } from "../common/commonButton/buttonStyles";
import Alert from "@mui/material/Alert";

const url = BASE_URL + POSTS_URL;

export default function DeleteButton({ postId }) {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const deletePost = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmation) return;

    try {
      const response = await fetch(`${url}/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      navigate("/posts");
    } catch (error) {
      setError(`Failed to delete post: ${error.message}`);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <CommonButton variant="contained" sx={buttonStyles} onClick={deletePost}>
        Delete
      </CommonButton>
    </>
  );
}
