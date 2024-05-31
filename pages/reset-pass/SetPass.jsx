import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../components/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SetPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("123456789");
  const [cPass, setCPass] = useState("123456789");

  const handleSetPassword = async () => {
    const response = await axiosInstance.post("set-password", {
      password: password,
    });
    return response.data;
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handleSetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["set-password"] });
      console.log("email send successfully");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(password);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
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
        error={password === cPass ? false : true}
      />
      <TextField
        type={showPassword ? "text" : "password"}
        label="Confirm Password"
        value={cPass}
        onChange={(e) => setCPass(e.target.value)}
        name="cpassword"
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
      <Button variant="contained" type="submit" onClick={handleSubmit}>
        Reset Password
      </Button>
    </>
  );
};

export default SetPass;
