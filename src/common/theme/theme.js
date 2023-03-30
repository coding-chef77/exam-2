import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#C46236",
      dark: "#A6522d",
      contrastText: "#fff",
    },
    background: {
      main: "hsl(19, 57%, 98%)",
      dark: "#5E4E46",
    },
  },
  typography: {
    fontFamily: "Raleway, 'Open Sans', sans-serif",
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
      fontSize: "22px",
    },
    h3: {
      fontWeight: 600,
      fontSize: "18px",
    },
    h4: {
      fontWeight: 600,
      fontSize: "16px",
    },
    h5: {
      fontWeight: 500,
      fontSize: "14px",
    },
    h6: {
      fontWeight: 500,
      fontSize: "12px",
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontFamily: "Lato, 'Open Sans', sans-serif",
      fontWeight: 400,
    },
    body2: {
      fontFamily: "Lato, 'Open Sans', sans-serif",
      fontWeight: 400,
    },
    button: {
      fontFamily: "Lato, 'Open Sans', sans-serif",
    },
  },
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 580,
      lg: 1200,
      xl: 1536,
    },
  },
});
