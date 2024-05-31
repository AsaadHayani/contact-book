import { Box, Typography } from "@mui/material";
import React from "react";

const ColoredBullet = ({ color, text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        mb: 1,
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          bgcolor: color,
          borderRadius: "50%",
          mr: 1,
        }}
      />
      <Typography>{text}</Typography>
    </Box>
  );
};

export default ColoredBullet;
