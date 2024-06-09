import { Button, Grid, TextField } from "@mui/material";
import React from "react";

const TopTableExportEmail = () => {
  return (
    <Grid
      container
      spacing={2}
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
        <Grid container spacing={2} justifyContent="flex-end">
          {/* <Grid item xs={6} sm={6} md={3}>
            <CheckCircleOutline color="success" />
            <Typography
              variant="body1"
              color="green"
              sx={{ marginLeft: { xs: 0, md: 1 } }}
            >
              Email sent successfully
            </Typography>
          </Grid> */}
          <Grid item xs={6} sm={6} md={4}>
            <TextField
              type="email"
              sx={{ bgcolor: "white" }}
              label="name@example.com"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopTableExportEmail;
