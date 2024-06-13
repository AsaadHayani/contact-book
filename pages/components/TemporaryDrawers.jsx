import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const TemporaryDrawers = ({
  open,
  setOpen,
  pages,
  handleLogout,
  currentUser,
}) => {
  const router = useRouter();

  const handleNavigation = (link) => {
    router.push(`/${link}`);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <Box bgcolor="primary.main" textAlign="center" py="10px">
        <img alt="Logo" src="/images/Logo_White.svg" />
      </Box>
      <Divider />
      <List>
        {pages?.map((item, index) => (
          <div key={index}>
            <ListItem
              disablePadding
              sx={{
                bgcolor: router.asPath === `/${item.link}` ? "#aaa" : null,
              }}
            >
              <ListItemButton onClick={() => handleNavigation(item.link)}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Username" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <Link
          href={`/users/${currentUser?.id}`}
          style={{ textDecoration: "none", color: "unset" }}
        >
          <ListItem disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => setOpen(true)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};
export default TemporaryDrawers;
