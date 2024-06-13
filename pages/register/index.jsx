import React from "react";
import FormRegister from "./FormRegister";
import Title from "../components/Title";
import { Box, Container, Grid, Typography } from "@mui/material";
import FooterAuth from "../components/FooterAuth";
import Image from "next/image";

const Index = () => {
  return (
    <>
      <Title title="Register" />
      <Grid container columns={16}>
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

            <Box
              component="form"
              display="flex"
              flexDirection="column"
              gap="20px"
              justifyContent="center"
              minHeight="100vh"
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
