import { Box, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

const NotFound = () => {
  return (
    <Box sx={{ textAlign: "center", paddingBlock: "50px", bgcolor: "white" }}>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <Typography variant="h5" color="initial">
        Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;
