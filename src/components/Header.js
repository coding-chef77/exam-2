import { Typography, Box } from "@mui/material";

export default function Header({
  heading,
  subheading,
  title,
  subtitle1,
  subtitle2,
}) {
  return (
    <Box mb="30px">
      {heading && (
        <Typography
          color="background.dark"
          variant="h1"
          component="h1"
          fontWeight="bold"
          fontSize="36px"
        >
          {heading}
        </Typography>
      )}
      {subheading && (
        <Typography
          color="background.dark"
          variant="h2"
          component="h2"
          fontWeight="bold"
          fontSize="22px"
        >
          {subheading}
        </Typography>
      )}
      {title && (
        <Typography
          color="background.dark"
          variant="h3"
          component="h3"
          fontWeight="bold"
          fontSize="36px"
          sx={{ mb: "5px" }}
        >
          {title}
        </Typography>
      )}
      {subtitle1 && (
        <Typography
          color="textSecondary"
          variant="h5"
          component="h4"
          fontSize="24px"
          fontWeight="medium"
        >
          {subtitle1}
        </Typography>
      )}
      {subtitle2 && (
        <Typography
          color="background.dark"
          variant="h6"
          component="h5"
          fontSize="18px"
        >
          {subtitle2}
        </Typography>
      )}
    </Box>
  );
}
