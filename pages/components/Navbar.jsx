import {
  AppBar,
  Box,
  Container,
  Menu,
  Toolbar,
  Typography,
  MenuItem,
  Button,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import TemporaryDrawer from "./TemporaryDrawer";
import {
  ContactEmergency,
  Home,
  LocationCity,
  PeopleAlt,
  Person,
} from "@mui/icons-material";
import Cookies from "universal-cookie";
import { axiosInstance } from "../api/api";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const cookie = new Cookies();

  const handleLogout = () => {
    cookie.remove("role");
    cookie.remove("Bearer");
    window.location.pathname = "/login";
  };
  const pages = [
    { text: "Home", link: "", icon: <Home /> },
    { text: "Contacts", link: "contacts", icon: <ContactEmergency /> },
    { text: "Company Profile", link: "profile", icon: <LocationCity /> },
    { text: "Users", link: "users", icon: <PeopleAlt /> },
  ];
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const fetchCurrentUser = async () => {
    const response = await axiosInstance.get(`users/current-user`, {
      headers: {
        Authorization: `Bearer ${cookie.get("Bearer")}`,
      },
    });
    return response.data;
  };

  const { data: currentUser } = useQuery({
    queryFn: fetchCurrentUser,
    queryKey: ["currentUser"],
  });

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <TemporaryDrawer {...{ open, handleLogout, pages, toggleDrawer }} />
          </Box>

          <Box
            sx={{
              display: { md: "block" },
              width: { xs: "100%", md: "auto" },
              textAlign: "center",
            }}
          >
            <Link href="/">
              <img alt="" src="/images/Logo_White.svg" />
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: "30px",
              ml: "30px",
            }}
          >
            {pages.map((page) => (
              <Link
                key={page.text}
                href={`/${page.link}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {page.text}
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "block" },
            }}
          >
            <Button
              onClick={handleOpenUserMenu}
              sx={{ display: "flex", gap: "10px" }}
            >
              <Person sx={{ color: "white" }} />
              <Typography
                variant="body1"
                color="white"
                textTransform={"capitalize"}
              >
                {currentUser?.firstName == undefined
                  ? "- User -"
                  : `${currentUser?.firstName} ${currentUser?.lastName}`}
              </Typography>
            </Button>
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Link
                  href={`/users/${currentUser?.id}`}
                  style={{ textDecoration: "none", color: "unset" }}
                >
                  My Profile
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
