import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";

const FooterAuth = () => {
  return (
    <Box sx={{ mt: "auto", position: "absolute", bottom: "0" }}>
      <Divider />
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: "column", lg: "row" }}
          textAlign={{ xs: "center", lg: false }}
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

export default FooterAuth;
