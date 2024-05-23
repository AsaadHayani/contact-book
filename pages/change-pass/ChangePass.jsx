import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

const ChangePass = () => {
  return (
    <>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
      >
        <TextField label="Enter your email address" size="small" type="text" />
        <Button variant="contained">Send</Button>
        <Link
          style={{ marginTop: "30px", textAlign: "center" }}
          href={"/login"}
        >
          Back to login
        </Link>
      </Box>
    </>
  );
};

export default ChangePass;
