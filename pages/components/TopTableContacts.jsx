import { Box, Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const TopTableContacts = () => {
  const router = useRouter();
  return (
    <Grid container spacing={2} columns={16} mb="10px">
      <Grid item xs={16} sm={16} md={4}>
        <TextField
          type="search"
          label="Search"
          size="small"
          fullWidth
          sx={{ bgcolor: "white" }}
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
              sx={{
                bgcolor: "#DC3545",
                "&:hover": { bgcolor: "#b52230" },
                textTransform: "none",
              }}
              fullWidth
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={8} sm={8} md={3}>
            <Button
              variant="contained"
              onClick={() => router.push(`/export-email`)}
              fullWidth
              sx={{ textTransform: "none" }}
            >
              Export to
            </Button>
          </Grid>
          <Grid item xs={8} sm={8} md={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => router.push("/send-email")}
              sx={{ textTransform: "none" }}
            >
              Send Email
            </Button>
          </Grid>
          <Grid item xs={8} sm={8} md={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#28A745",
                "&:hover": { bgcolor: "#208837" },
                textTransform: "none",
              }}
              onClick={() => router.push("/contacts/create")}
            >
              Create New
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopTableContacts;
