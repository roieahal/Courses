import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/data";
import jwt_decode from "jwt-decode";

function ResponsiveAppBar() {
  const { userData, setUserData, counter, setCounter, getUserData, getAllCoursesUser } = useContext(DataContext);

  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, [localStorage.getItem("token")]);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigateToLogIn = () => {
    navigate("/SignIn");
  };
  const navigateToAllCourses = () => {
    navigate("/");
  };
  const navigateToMyCourses = () => {
    navigate("/MyCourses");
  };

  const handleLogout = (event) => {
    localStorage.removeItem("token");
    handleCloseUserMenu();
    setCounter(0);
    setUserData({ name: null });
    navigate("/SignIn");
  };
  const pages = [
    ["All Courses", navigateToAllCourses],
    ["Log In", navigateToLogIn],
    ["My Courses", navigateToMyCourses],
  ];
  const settings = [
    [userData.name, handleCloseUserMenu],
    ["Logout", handleLogout],
  ];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Courses.Dot
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                if (page[0] === "All Courses") {
                  return (
                    <MenuItem key={page[0]} onClick={page[1]}>
                      <Typography textAlign="center">{page[0]}</Typography>
                    </MenuItem>
                  );
                } else if (page[0] === "Log In") {
                  return localStorage.getItem("token") ? null : (
                    <MenuItem key={page[0]} onClick={page[1]}>
                      <Typography textAlign="center">{page[0]}</Typography>
                    </MenuItem>
                  );
                } else if (page[0] === "My Courses") {
                  return localStorage.getItem("token") ? (
                    <MenuItem key={page[0]} onClick={page[1]}>
                      <Typography textAlign="center">{page[0]}</Typography>
                    </MenuItem>
                  ) : null;
                } else {
                  return null;
                }
              })}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Courses.Dot
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              if (page[0] === "All Courses") {
                return (
                  <MenuItem key={page[0]} onClick={page[1]}>
                    <Typography textAlign="center">{page[0]}</Typography>
                  </MenuItem>
                );
              } else if (page[0] === "Log In") {
                return localStorage.getItem("token") ? null : (
                  <MenuItem key={page[0]} onClick={page[1]}>
                    <Typography textAlign="center">{page[0]}</Typography>
                  </MenuItem>
                );
              } else if (page[0] === "My Courses") {
                return localStorage.getItem("token") ? (
                  <MenuItem key={page[0]} onClick={page[1]}>
                    <Typography textAlign="center">{page[0]}</Typography>
                  </MenuItem>
                ) : null;
              } else {
                return null;
              }
            })}
          </Box>
          {localStorage.getItem("token") ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
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
                  <MenuItem key={setting[0]} onClick={setting[1]}>
                    <Typography textAlign="center">{setting[0]}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
