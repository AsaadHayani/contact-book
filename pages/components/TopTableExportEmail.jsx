import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const TopTableExportEmail = () => {
  return (
    <Grid container spacing={2} columns={16}>
      <Grid item xs={16} sm={16} md={4}>
        <TextField
          type="search"
          label="Search"
          fullWidth
          sx={{ bgcolor: "white" }}
          size="small"
        />
      </Grid>
      <Grid item xs={16} sm={16} md={12} container spacing={2}>
        <Grid item xs={12} sm={12} md={4} container>
          <CheckCircleOutline color="success" />
          <Typography
            variant="body1"
            color="green"
            sx={{ marginLeft: { xs: 0, md: 1 } }}
          >
            Email sent successfully
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            type="email"
            sx={{ bgcolor: "white" }}
            label="name@example.com"
            size="small"
            fullWidt
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Button
            variant="contained"
            sx={{ width: "120px", textTransform: "none" }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopTableExportEmail;
