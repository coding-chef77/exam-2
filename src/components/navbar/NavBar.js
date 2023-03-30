import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, AuthContext } from "../../context/AuthContext";
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
  const { auth, setAuth } = useAuth(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    navigate("/");
  };

  const settings = [
    { name: "Profile", link: "/myprofile" },
    { name: "Logout", link: "" },
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    setAnchorElUser(null);
  }, [auth]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "hsl(20, 21%, 75%)" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <a href={auth ? "/posts" : "/"}>
            <img src={logo} sx={{}} height="55px" alt="Logo" />
          </a>
          <Typography
            variant="h2"
            noWrap
            component="a"
            href={auth ? "/posts" : "/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              letterSpacing: ".3rem",
              color: "background.dark",
              textDecoration: "none",
              justifyContent: "center",
            }}
          >
            Life with Twins
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={auth ? "/posts" : "/"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              letterSpacing: ".3rem",
              color: "background.dark",
              textDecoration: "none",
              justifyContent: "center",
            }}
          >
            Life with Twins
          </Typography>

          <Box sx={{ flexGrow: -1 }}>
            {auth ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AvatarImage />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{
                    mt: "45px",
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={
                        setting.name === "Logout"
                          ? handleLogout
                          : handleCloseUserMenu
                      }
                      sx={{
                        backgroundColor: "#fff",
                        "&:hover": {
                          backgroundColor: "background.main",
                        },
                      }}
                    >
                      <Link to={setting.link}>
                        <Typography
                          textAlign="center"
                          sx={{
                            color: "#333",
                            padding: "4px 8px",
                          }}
                        >
                          {setting.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
