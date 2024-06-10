import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { axiosInstance } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useRouter } from "next/router";

const SetPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("12345678");
  const [cPass, setCPass] = useState("12345678");
  const router = useRouter();
  const { id, code } = router.query;

  const handleSetPassword = async () => {
    const response = await axiosInstance.post(
      `reset-password?id=${id}&code=${code}`,
      { password }
    );
    return response.data;
  };
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: handleSetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reset-password"] });
      router.push(`/login`);
    },
  });

  const [errors, setErrors] = React.useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== cPass) {
      setErrors({
        password: "Passwords do not match",
        cPass: "Passwords do not match",
      });
    } else {
      setErrors({ password: "", cPass: "" });
      // Handle form submission
      console.log("Form submitted");
      mutate(password);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error.message} />}
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        helperText={errors.password}
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
        error={!!errors.password}
      />
      <TextField
        type={showPassword ? "text" : "password"}
        label="Confirm Password"
        value={cPass}
        onChange={(e) => setCPass(e.target.value)}
        name="cpassword"
        error={!!errors.cPass}
        helperText={errors.cPass}
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
      <Button
        variant="contained"
        type="submit"
        onClick={handleSubmit}
        sx={{ textTransform: "none" }}
      >
        Reset Password
      </Button>
    </>
  );
};

export default SetPass;
