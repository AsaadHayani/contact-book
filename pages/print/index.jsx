import { Card, Container, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Title from "../components/Title";
import TablePrint from "./TablePrint";

const Index = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "20px",
      }}
    >
      <Title title="A4 PDF" />

      <Card sx={{ width: "60%", p: "30px 20px", textAlign: "center" }}>
        <svg
          src="./images/Logo_White.svg"
          alt="Logo"
          width={200}
          height={100}
        />

        <TablePrint />

        <Typography variant="body1" color="initial" fontSize="13px">
          Copyright © ITM Development | Contact Book | 2022
        </Typography>
      </Card>
    </Container>
  );
};

export default Index;
