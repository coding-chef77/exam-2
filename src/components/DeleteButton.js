import { BASE_URL, POSTS_URL } from "../constants/api";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../common/commonButton/CommonButton";
import { buttonStyles } from "../common/commonButton/buttonStyles";

const url = BASE_URL + POSTS_URL;

export default function DeleteButton({ postId }) {
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const navigate = useNavigate();
  const deletePost = () => {
    fetch(`${url}/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })

      .then((data) => {
        navigate("/posts");
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <CommonButton variant="contained" sx={buttonStyles} onClick={deletePost}>
      Delete
    </CommonButton>
  );
}
