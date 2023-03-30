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
      <Typography
        color="background.dark"
        variant="h1"
        component="h1"
        fontWeight="bold"
        fontSize="36px"
      >
        {heading}
      </Typography>
      <Typography
        color="background.dark"
        variant="h2"
        component="h3"
        fontWeight="bold"
        fontSize="22px"
      >
        {subheading}
      </Typography>
      <Typography
        color="background.dark"
        variant="h3"
        component="h2"
        fontWeight="bold"
        fontSize="36px"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography
        color="textSecondary"
        variant="h5"
        component="h5"
        fontSize="24px"
        fontWeight="medium"
      >
        {subtitle1}
      </Typography>
      <Typography
        color="background.dark"
        variant="h5"
        component="h6"
        fontSize="18px"
      >
        {subtitle2}
      </Typography>
    </Box>
  );
}
