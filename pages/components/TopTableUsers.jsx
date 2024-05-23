import { Box, Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const TopTableUsers = () => {
  const router = useRouter();
  return (
    <Grid container spacing={2} columns={16} mb="10px">
      <Grid item xs={16} sm={16} md={4}>
        <TextField
          id="outlined-basic"
          label="Search"
          fullWidth
          sx={{ bgcolor: "white" }}
          size="small"
        />
      </Grid>
      <Grid item xs={16} sm={16} md={12}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: { md: "end", xs: "center" } }}
        >
          <Grid item xs={8} sm={8} md={3}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#DC3545", "&:hover": { bgcolor: "#b52230" } }}
              fullWidth
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={8} sm={8} md={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                router.push("/users/invite-user");
              }}
            >
              Invite New User
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopTableUsers;
