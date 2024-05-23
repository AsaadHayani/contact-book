import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AssignmentInd, ExitToApp, PeopleAlt } from "@mui/icons-material";
import Link from "next/link";

export default function TemporaryDrawer({
  open,
  toggleDrawer,
  pages,
  settings,
}) {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box bgcolor="primary.main" textAlign="center" py="10px">
        <img src="/images/Logo_White.svg" />
      </Box>
      <Divider />
      <List>
        {pages.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            style={{ textDecoration: "none", color: "unset" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </Link>
        ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Username" />
          </ListItemButton>
        </ListItem>
        <Divider />
        {settings.map((item, index) => {
          return (
            <Link
              href={item.link}
              key={index}
              style={{
                textDecoration: "none",
                color: "unset",
              }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </Link>
          );
        })}
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
