import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axiosInstance from "../components/api";
import Cookies from "universal-cookie";
import Loading from "../components/Loading";
import { useMutation } from "@tanstack/react-query";

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

  const [loading, setLoading] = useState(false);

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
  const loginMutation = useMutation({
    mutationFn: login,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (response) => {
      const token = response.token;
      cookie.set("Bearer", token, { path: "/" });
      router.push("/users");
      setLoading(false);
    },
    onError: (error) => {
      if (error.response.status === 401) setErrorEmail(true);
      console.log(error);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(form);
  };

  return (
    <>
      {loading && <Loading open={loading} setOpen={setLoading} />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
        }}
      >
        <TextField
          label="Email"
          type="text"
          name="email"
          value={form.email}
          onChange={handleFormChange}
          size="small"
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label="Password"
          value={form.password}
          name="password"
          onChange={handleFormChange}
          size="small"
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Link href="/change-pass">Forgot Password</Link>
        </Box>
      </Box>

      <Button variant="contained" type="submit" onClick={handleSubmit}>
        Sign in
      </Button>

      <Box sx={{ position: "relative", width: "100%" }}>
        <Divider
          sx={{
            position: "absolute",
            top: "13px",
            left: "0",
            width: "25%",
            borderColor: grey[700],
          }}
        />
        <Typography sx={{ textAlign: "center" }}>
          Don't have account?
        </Typography>
        <Divider
          sx={{
            position: "absolute",
            top: "13px",
            right: "0",
            width: "25%",
            borderColor: grey[700],
          }}
        />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="outlined"
          sx={{ width: "220px" }}
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
