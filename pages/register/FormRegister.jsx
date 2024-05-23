import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
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
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../components/Loading";
import axiosInstance from "../components/api";

const FormRegister = () => {
  const [form, setForm] = useState({
    firstName: "Asaad",
    lastName: "Hayani",
    email: "asaad@gmail.com",
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

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(
        `register`,
        {
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
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/login");
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
      >
        <Typography variant="h5" color="grey">
          Account details
        </Typography>
        <Grid container spacing={2} columns={16} mb="10px">
          <Grid item xs={8}>
            <TextField
              label="First Name"
              type="text"
              size="small"
              name="firstName"
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
              value={form.email}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Password"
              sx={{ width: "213px" }}
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
              name="zip"
              value={form.zip}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={8}>
            <FormControl sx={{ width: "213px" }} size="small">
              <InputLabel id="demo-simple-select-label">
                Select your country
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="country"
                value={form.country}
                label="Age"
                onChange={handleFormChange}
              >
                <MenuItem value="10">Ten</MenuItem>
                <MenuItem value="20">Twenty</MenuItem>
                <MenuItem value="30">Thirty</MenuItem>
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
      </Box>
    </>
  );
};

export default FormRegister;
