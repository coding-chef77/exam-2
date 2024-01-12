import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Tooltip,
  MenuItem,
} from "@mui/material";
import logo from "./logo/logo.png";
import AvatarImage from "./ProfileAvatar";

export default function NavBar() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    navigate("/");
  };

  const settings = auth
    ? [
        { name: "Profile", link: "/myprofile" },
        { name: "Logout", action: handleLogout },
      ]
    : [];

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const renderMenuItems = () =>
    settings.map((setting) => (
      <MenuItem
        key={setting.name}
        onClick={setting.action || handleCloseUserMenu}
      >
        <Link
          to={setting.link || "#"}
          style={{ textDecoration: "none", color: "#333" }}
        >
          <Typography textAlign="center">{setting.name}</Typography>
        </Link>
      </MenuItem>
    ));

  return (
    <AppBar position="static" sx={{ backgroundColor: "hsl(20, 21%, 75%)" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link to={auth ? "/posts" : "/"} style={{ marginRight: 2 }}>
            <img src={logo} height="55px" alt="Logo" />
          </Link>
          {/* Title for different screen sizes */}
          <Typography
            variant="h2"
            component={Link}
            to={auth ? "/posts" : "/"}
            sx={{ ...commonTitleStyles, display: { xs: "none", md: "flex" } }}
          >
            Life with Twins
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to={auth ? "/posts" : "/"}
            sx={{ ...commonTitleStyles, display: { xs: "flex", md: "none" } }}
          >
            Life with Twins
          </Typography>

          {auth && (
            <Box sx={{ flexGrow: -1 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AvatarImage />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {renderMenuItems()}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const commonTitleStyles = {
  flexGrow: 1,
  letterSpacing: ".3rem",
  color: "background.dark",
  textDecoration: "none",
  justifyContent: "center",
};
