import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Avatar
      sx={{
        m: 2,
        bgcolor: "primary.main",
        "&:hover": {
          bgcolor: "primary.dark",
          cursor: "pointer",
        },
      }}
      onClick={() => navigate(-1)}
    >
      <ArrowBackOutlinedIcon />
    </Avatar>
  );
};
