import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import FooterAuth from "./FooterAuth";

const LayoutAuth = ({ children, title }) => {
  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={3}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{ display: { xs: "none", sm: "block" }, position: "relative" }}
        >
          <img
            src="/images/Image.jpg"
            width={500}
            height={500}
            alt="Logo"
            style={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
            }}
            priority={`true`}
          />
          <FooterAuth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Container>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
                textAlign: "center",
                py: "30px",
              }}
            >
              <img
                width={200}
                height={200}
                alt="Logo"
                src="/images/Logo_Vertical.svg"
              />
            </Box>

            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ display: { xs: "none", sm: "block" }, mb: "20px" }}
            >
              {title}
            </Typography>

            <Box
              component="form"
              display="flex"
              flexDirection="column"
              gap="20px"
            >
              {children}
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default LayoutAuth;
