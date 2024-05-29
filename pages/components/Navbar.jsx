import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Typography,
  MenuItem,
  Tooltip,
  Button,
  Icon,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import Path from "./Path";
import TemporaryDrawer from "./TemporaryDrawer";
import {
  AssignmentInd,
  ContactEmergency,
  ExitToApp,
  Home,
  LocationCity,
  PeopleAlt,
  Person,
} from "@mui/icons-material";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import axiosInstance from "./api";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const cookie = new Cookies();

  const handleLogout = () => {
    cookie.remove("Bearer");
    window.location.pathname = "/";
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
  const [username, setUsername] = React.useState([]);
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(`users/current-user`, {
        headers: {
          Authorization: `Bearer ${cookie.get("Bearer")}`,
        },
      });
      setUsername(`${response.data.firstName} ${response.data.lastName}`);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <TemporaryDrawer
              open={open}
              toggleDrawer={toggleDrawer}
              pages={pages}
              handleLogout={handleLogout}
            />
          </Box>

          <Box
            sx={{
              display: { md: "block" },
              width: { xs: "100%", md: "auto" },
              textAlign: "center",
            }}
          >
            <Link href="/">
              <img src="/images/Logo_White.svg" />
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
                {username == "" ? "User not Found" : username}
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
                  href="/users/details"
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
