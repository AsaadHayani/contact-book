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
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axiosInstance from "../components/api";
import Cookies from "universal-cookie";
import Loading from "../components/Loading";

const FormLogin = () => {
  const [email, setEmail] = useState("asaad@gmail.com");
  const [password, setPassword] = useState("12345678");
  const router = useRouter();

  const cookie = new Cookies();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.token;
      cookie.set("Bearer", token, { path: "/" });
      router.push("/users");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {loading && <Loading open={loading} setOpen={setLoading} />}
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
      >
        <TextField
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

      <Button variant="contained" onClick={handleSubmit}>
        Sign in
      </Button>
      <Box sx={{ position: "relative" }}>
        <Divider
          sx={{
            position: "absolute",
            top: "13px",
            left: "0",
            width: "30%",
            borderColor: grey[700],
          }}
        />
        <Typography sx={{ textAlign: "center", zIndex: "1000000px" }}>
          Don't have account?
        </Typography>
        <Divider
          sx={{
            position: "absolute",
            top: "13px",
            right: "0",
            width: "30%",
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
