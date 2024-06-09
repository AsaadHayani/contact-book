import { Button, Grid, Menu, MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Cookies from "universal-cookie";

const TopTableContacts = ({ handleDelete, isPendingDelete }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const cookie = new Cookies();

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      mb="10px"
      flexDirection={{ xs: "column-reverse", md: "row" }}
    >
      <Grid item xs={12} md={4}>
        <TextField
          type="search"
          label="Search"
          size="small"
          fullWidth
          sx={{ bgcolor: "white" }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          {cookie.get("role") !== "User" && (
            <Grid item xs={6} sm={6} md={3}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={handleDelete}
                disabled={isPendingDelete}
              >
                Delete
              </Button>
            </Grid>
          )}
          <Grid item xs={6} sm={6} md={3}>
            <Button
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClickMenu}
              variant="contained"
              fullWidth
              sx={{ textTransform: "none" }}
            >
              Export to
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseMenu;
                  router.push(`/print`);
                }}
              >
                PDF File
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu;
                  router.push(`/export-email`);
                }}
              >
                Send via email
              </MenuItem>
            </Menu>
          </Grid>
          {cookie.get("role") !== "User" && (
            <Grid item xs={6} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={() => router.push("/send-email")}
              >
                Send Email
              </Button>
            </Grid>
          )}
          {cookie.get("role") !== "User" && (
            <Grid item xs={6} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                color="success"
                sx={{ textTransform: "none" }}
                onClick={() => router.push("/contacts/create")}
              >
                Create New
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopTableContacts;
