import { RemoveRedEye, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";

const SetPass = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
    >
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        size="small"
      />
      <TextField
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Confirm password"
        size="small"
      />
      <Button variant="contained">Reset Password</Button>
    </Box>
  );
};

export default SetPass;
