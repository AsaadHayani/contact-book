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

export default function TemporaryDrawer({
  open,
  toggleDrawer,
  pages,
  role,
  handleLogout,
}) {
  const router = useRouter();
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box bgcolor="primary.main" textAlign="center" py="10px">
        <img src="/images/Logo_White.svg" />
      </Box>
      <Divider />
      <List>
        {pages.map((item, index) => {
          return role === "Owner" && item.text === "Users" ? null : (
            <div key={index}>
              <ListItem
                disablePadding
                sx={{
                  bgcolor: router.asPath === `/${item.link}` ? "#aaa" : null,
                }}
              >
                <ListItemButton
                  onClick={() => {
                    router.push(`/${item.link}`);
                  }}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          );
        })}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Username" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <Link
          href={`/profile`}
          style={{
            textDecoration: "none",
            color: "unset",
          }}
        >
          <ListItem disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </Link>

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
        onClick={toggleDrawer(true)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
