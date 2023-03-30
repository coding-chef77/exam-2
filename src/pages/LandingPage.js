import { useNavigate } from "react-router-dom";
import CommonButton from "../common/commonButton/CommonButton";
import { buttonStyles } from "../common/commonButton/buttonStyles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <Grid container justifyContent="center" paddingTop={5}>
        <Paper elevation={3} style={{ maxWidth: "500px" }}>
          <Grid item padding={2}>
            <Header heading={"Welcome to Twin Chat"} />
            <Header
              subheading={
                "The go to place to share and find info about life with twins"
              }
            />

            <Typography variant="body1">
              Twin Chat is by twin parents for twin parents. A platform to share
              insights and ideas, our learnings, questions, and to ultimately
              help us all survive and enjoy being parents of twins! Whether
              you’ve just found out you’re expecting twins, recently welcomed
              twins to the world, have older twins or even are a twin yourself,
              this is a global community for us.
            </Typography>
            <Typography pt={2} variant="subtitle1">
              Simply register to become a part of the community.
            </Typography>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            padding={4}
          >
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
      </Grid>
    </Box>
  );
}
