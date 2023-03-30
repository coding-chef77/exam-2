import { Box, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "hsl(20, 21%, 75%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px 0",
        textAlign: "center",
      }}
    >
      <Typography variant="subtitle2">
        Twin Chat Copyright © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
