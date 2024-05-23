import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const LayoutAuth = ({ children, title }) => {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={7}
      sx={{ display: "flex", alignItems: "center" }}
      my={0}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          backgroundImage: "url(/images/Image.jpg)",
          height: "100vh",
          backgroundSize: "cover",
          objectFit: "fill",
          display: { xs: "none", md: "block" },
        }}
      />
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
        }}
      >
        <Box
          sx={{ display: { xs: "block", md: "none" }, my: "30px" }}
          textAlign="center"
        >
          <img src="/images/Logo_Vertical.svg" />
        </Box>
        <Typography
          variant="h4"
          mb="5px"
          fontWeight="bold"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default LayoutAuth;
