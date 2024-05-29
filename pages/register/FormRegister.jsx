import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../components/Loading";
import axiosInstance from "../components/api";
import { grey } from "@mui/material/colors";
import { useMutation } from "@tanstack/react-query";
import Cookies from "universal-cookie";

const FormRegister = () => {
  const [form, setForm] = useState({
    firstName: "Asaad",
    lastName: "Hayani",
    email: "asaad99hayani@gmail.com",
    phoneNumber: "12345",
    password: "12345678",
    companyName: "sappro",
    vatNumber: "123",
    streetOne: "streetOne",
    streetTwo: "streetTwo",
    city: "string",
    state: "string",
    zip: "string",
    country: "string",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const router = useRouter();

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const cookie = new Cookies();
  const login = async () => {
    const response = await axiosInstance.post(`login`, {
      email: form.email,
      password: form.password,
    });
    return response.data;
  };
  const register = async () => {
    const response = await axiosInstance.post(`register`, {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      password: form.password,
      companyName: form.companyName,
      vatNumber: form.vatNumber,
      streetOne: form.streetOne,
      streetTwo: form.streetTwo,
      city: form.city,
      state: form.state,
      zip: form.zip,
      country: form.country,
    });
    return response.data;
  };
  const registerMutation = useMutation({
    mutationFn: register,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: async () => {
      setLoading(false);
      try {
        const loginResponse = await login();
        const token = await loginResponse.token;
        cookie.set("Bearer", token, { path: "/" });
        router.push("/users");
      } catch (loginError) {
        console.error("Error logging in:", loginError);
      }
    },
    onError: (error) => {
      if (error.response.status === 403) setErrorEmail(true);
      console.error("Error registering:", error);
      setLoading(false);
    },
    onSettled: (response) => {
      setLoading(false);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(form);
  };

  return (
    <>
      {loading && <Loading />}
      <Typography variant="h5" color={grey[700]}>
        Account details
      </Typography>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <TextField
            label="First Name"
            type="text"
            size="small"
            fullWidth
            name="firstName"
            required
            value={form.firstName}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="Last Name"
            type="text"
            size="small"
            name="lastName"
            fullWidth
            value={form.lastName}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="Email"
            type="email"
            size="small"
            name="email"
            fullWidth
            value={form.email}
            required
            onChange={handleFormChange}
            error={errorEmail}
            helperText={errorEmail && "Exist Email!"}
          />
        </Grid>
        <Grid item xs={8}>
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
            fullWidth
            name="password"
            value={form.password}
            onChange={handleFormChange}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" color="grey">
        Billing details
      </Typography>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <TextField
            type="text"
            label="Company Name"
            size="small"
            fullWidth
            name="companyName"
            value={form.companyName}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            type="number"
            label="VAT Number"
            size="small"
            fullWidth
            name="vatNumber"
            value={form.vatNumber}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            type="text"
            label="Street"
            size="small"
            fullWidth
            name="streetOne"
            value={form.streetOne}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="Street 2 (Optional)"
            type="text"
            size="small"
            fullWidth
            name="streetTwo"
            value={form.streetTwo}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            type="text"
            label="City"
            size="small"
            fullWidth
            name="city"
            value={form.city}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            type="text"
            label="State"
            size="small"
            fullWidth
            name="state"
            value={form.state}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            type="text"
            label="Zip"
            size="small"
            fullWidth
            name="zip"
            value={form.zip}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth size="small">
            <InputLabel>Select your country</InputLabel>
            <Select
              name="country"
              defaultValue={form.country}
              onChange={handleFormChange}
            >
              <MenuItem value={"10"}>Ten</MenuItem>
              <MenuItem value={"20"}>Twenty</MenuItem>
              <MenuItem value={"30"}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <FormControlLabel
        control={<Checkbox />}
        label="I agree to the website terms and conditions"
      />
      <Button variant="contained" type="submit" onClick={handleSubmit}>
        Register
      </Button>
      <Link href={"/login"} style={{ textAlign: "center" }}>
        Sign in instead
      </Link>
    </>
  );
};

export default FormRegister;
