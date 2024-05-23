import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Divider />
      <Container>
        <Box display="flex" justifyContent="space-between" mt="10px">
          <Typography variant="body1" color="grey" fontSize={12}>
            Copyright © ITM Development | Contact Book | 2022
          </Typography>
          <Typography variant="body1" color="grey" fontSize={12}>
            Privacy Policy - Terms & Conditions
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
