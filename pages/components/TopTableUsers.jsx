import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const TopTableUsers = ({ handleDelete, isPendingDelete }) => {
  const router = useRouter();
  const cookies = new Cookies();
  const [userRole, setUserRole] = useState("User");
  useEffect(() => {
    setUserRole(cookies.get("role"));
  }, [cookies.get("role")]);

  return (
    <Grid
      container
      spacing={2}
      columns={16}
      mb="10px"
      flexDirection={{ xs: "column-reverse", md: "row" }}
    >
      <Grid item xs={16} sm={16} md={4}>
        <TextField
          type="search"
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
          {userRole === "Owner" && (
            <Grid item xs={8} sm={8} md={3}>
              <Button
                variant="contained"
                color="error"
                sx={{ textTransform: "none" }}
                fullWidth
                onClick={handleDelete}
                disabled={isPendingDelete}
              >
                Delete
              </Button>
            </Grid>
          )}
          {cookies.get("role") !== "User" && (
            <Grid item xs={8} sm={8} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => router.push("/users/invite-user")}
                sx={{ textTransform: "none" }}
              >
                Invite New User
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopTableUsers;
