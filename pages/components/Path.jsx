import { Box, Container, Divider, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

const Path = ({ title, path }) => {
  return (
    <Container sx={{ mb: "10px" }}>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={title} />
      </Head>
      <Box className="path">
        <Typography variant="h6" color="initial">
          {path}
        </Typography>
      </Box>
      <Divider />
    </Container>
  );
};

export default Path;
