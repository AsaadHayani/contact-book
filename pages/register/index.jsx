import React from "react";
import FormRegister from "./FormRegister";
import Title from "../components/Title";
import { Box, Container, Grid, Typography } from "@mui/material";
import FooterAuth from "../components/FooterAuth";

const Index = () => {
  return (
    <>
      <Title title="Register" />
      <Grid
        container
        columnSpacing={10}
        columns={16}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Grid
          item
          xs={16}
          md={7}
          sx={{ display: { xs: "none", md: "block" }, position: "relative" }}
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

        <Grid item xs={16} md={9}>
          <Container sx={{ width: "80%" }}>
            <Box
              sx={{
                display: { xs: "block", md: "none" },
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
              sx={{ display: { xs: "none", md: "block" }, mb: "20px" }}
            >
              Create Account
            </Typography>

            <Box
              component="form"
              display="flex"
              flexDirection="column"
              gap="20px"
            >
              <FormRegister />
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
