import { Box, Typography } from "@mui/material";

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
      aria-label="Footer"
    >
      <Typography variant="subtitle2">
        Twin Chat Copyright © {new Date().getFullYear()}
      </Typography>
      {/* Optional: Add links or other info here */}
    </Box>
  );
}
