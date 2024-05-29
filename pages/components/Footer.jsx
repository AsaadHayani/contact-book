import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box sx={{ mt: "auto" }}>
      <Divider />
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: "column", sm: "row" }}
          textAlign={{ xs: "center", sm: false }}
          my="10px"
        >
          <Typography variant="body1" color="grey" fontSize={12}>
            Copyright © ITM Development | Contact Book | 2022
          </Typography>
          <Typography variant="body1" color="grey" fontSize={12}>
            Privacy Policy - Terms & Conditions
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;