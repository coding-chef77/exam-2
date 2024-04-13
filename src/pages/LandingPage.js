import { useNavigate } from "react-router-dom";
import CommonButton from "../common/commonButton/CommonButton";
import { buttonStyles } from "../common/commonButton/buttonStyles";
import { Grid, Box, Paper, Typography, Container } from "@mui/material";
import Header from "../components/Header";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box paddingY={5}>
        <Paper elevation={3} sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
          <Header
            heading="Welcome to Twin Chat"
            subheading="Join the twin community"
          />

          <Typography variant="body1" paragraph>
            Twin Chat is by twin parents for twin parents. A platform to share
            insights and ideas, our learnings, questions, and to ultimately help
            us all survive and enjoy being parents of twins! Whether you’ve just
            found out you’re expecting twins, recently welcomed twins to the
            world, have older twins or even are a twin yourself, this is a
            global community for us.
          </Typography>

          <Grid container spacing={2} justifyContent="center" paddingTop={4}>
            <Grid item>
              <CommonButton
                variant="contained"
                sx={buttonStyles}
                onClick={() => navigate("/register")}
              >
                Register
              </CommonButton>
            </Grid>
            <Grid item>
              <CommonButton
                variant="contained"
                sx={buttonStyles}
                onClick={() => navigate("/login")}
              >
                Login
              </CommonButton>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}
