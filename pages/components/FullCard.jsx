import { Box, Card, Container, Paper, Typography } from "@mui/material";
import React from "react";

const FullCard = ({ children, title, element }) => {
  return (
    <Container>
      <Paper
        sx={{
          boxShadow: "0px 3px 15px #00000012",
          border: "1px solid #E0E0E0",
        }}
      >
        <Box
          py="10px"
          bgcolor="#f5f5f5"
          display="flex"
          justifyContent="space-between"
          px="40px"
        >
          <Typography variant="h6">{title}</Typography>

          {element}
        </Box>
        <Card
          component="form"
          sx={{ paddingInline: "40px", paddingBlock: "20px" }}
        >
          {children}
        </Card>
      </Paper>
    </Container>
  );
};

export default FullCard;
