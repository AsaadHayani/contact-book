import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { axiosInstance } from "../components/api";
import Cookies from "universal-cookie";
import Loading from "../components/Loading";
import { useMutation } from "@tanstack/react-query";
import Error from "../components/Error";

const FormLogin = () => {
  const [form, setForm] = useState({
    email: "asaad99hayani@gmail.com",
    password: "12345678",
  });
  const [errorEmail, setErrorEmail] = useState(false);
  const router = useRouter();

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const cookie = new Cookies();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    const response = await axiosInstance.post(`login`, {
      email: form.email,
      password: form.password,
    });
    return response.data;
  };
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const token = response.token;
      cookie.set("Bearer", token, { path: "/" });
      cookie.set("role", response.role, { path: "/" });
      router.push("/");
    },
    onError: (error) => {
      if (error.response.status === 401) setErrorEmail(true);
    },
  });

  const [errors, setErrors] = React.useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.email) newErrors.email = "Field required";
    if (!form.password) newErrors.password = "Field required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      mutate(form);
    }
  };

  return (
    <>
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error.message} />}
      <Box display="flex" flexDirection="column" rowGap="10px">
        <TextField
          label="Email"
          type="text"
          name="email"
          value={form.email}
          onChange={handleFormChange}
          size="small"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label="Password"
          value={form.password}
          name="password"
          onChange={handleFormChange}
          size="small"
          error={!!errors.password}
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
        />
        <Typography variant="body1" color="error">
          {errorEmail && "Wrong Email or Password!"}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Link href="/change-pass">Forgot Password</Link>
        </Box>
      </Box>

      <Button
        variant="contained"
        type="submit"
        onClick={handleSubmit}
        sx={{ textTransform: "none" }}
      >
        Sign in
      </Button>

      <Box sx={{ position: "relative", width: "100%" }}>
        <Divider
          sx={{
            position: "absolute",
            top: "13px",
            left: "0",
            width: "20%",
            borderColor: grey[700],
          }}
        />
        <Typography sx={{ textAlign: "center" }}>Dont have account?</Typography>
        <Divider
          sx={{
            position: "absolute",
            top: "13px",
            right: "0",
            width: "20%",
            borderColor: grey[700],
          }}
        />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="outlined"
          sx={{ px: "30px", textTransform: "none" }}
          onClick={() => {
            router.push("/register");
          }}
        >
          Sign up
        </Button>
      </Box>
    </>
  );
};

export default FormLogin;
