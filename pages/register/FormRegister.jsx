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
import Error from "../components/Error";

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
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: register,
    onSuccess: async () => {
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
    },
  });
  const [errors, setErrors] = React.useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "Field required";
    if (!form.lastName) newErrors.lastName = "Field required";
    if (!form.email) newErrors.email = "Field required";
    if (!form.password) newErrors.password = "Field required";
    if (!form.phoneNumber) newErrors.phoneNumber = "Field required";
    if (!form.companyName) newErrors.companyName = "Field required";
    if (!form.state) newErrors.state = "Field required";
    if (!form.streetOne) newErrors.streetOne = "Field required";
    if (!form.streetTwo) newErrors.streetTwo = "Field required";
    if (!form.country) newErrors.country = "Field required";
    if (!form.city) newErrors.city = "Field required";
    if (!form.vatNumber) newErrors.vatNumber = "Field required";
    if (!form.zip) newErrors.zip = "Field required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      mutate(form);
    }
  };

  return (
    <>
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error} />}
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
            error={!!errors.firstName}
            helperText={errors.firstName}
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
            error={!!errors.lastName}
            helperText={errors.lastName}
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
            error={!!errors.companyName}
            helperText={errors.companyName}
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
            error={!!errors.vatNumber}
            helperText={errors.vatNumber}
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
            error={!!errors.streetOne}
            helperText={errors.streetOne}
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
            error={!!errors.streetTwo}
            helperText={errors.streetTwo}
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
            error={!!errors.city}
            helperText={errors.city}
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
            error={!!errors.state}
            helperText={errors.state}
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
            error={!!errors.zip}
            helperText={errors.zip}
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
              <MenuItem value="Syria">Syria</MenuItem>
              <MenuItem value="Egypt">Egypt</MenuItem>
              <MenuItem value="KSA">KSA</MenuItem>
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
