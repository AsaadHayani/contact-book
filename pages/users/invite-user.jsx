import React, { useState } from "react";
import FullCard from "../components/FullCard";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Path from "../components/Path";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { axiosInstance } from "../components/api";
import Loading from "../components/Loading";
import Error from "../components/Error";

const InviteUser = () => {
  const [form, setForm] = useState({
    firstName: "asaad",
    lastName: "hayani",
    email: "asaad99hayani@gmail.com",
    phoneNumber: "12345",
    role: "User",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const router = useRouter();
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const createInviteUser = async () => {
    const response = await axiosInstance.post(
      `users`,
      {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        role: form.role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const [errorEmail, setErrorEmail] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createInviteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("invite user success");
      router.push(`/users`);
    },
    onError: (error) => {
      if (error.response.data === "User is already registered.") {
        setErrorEmail(true);
      }
    },
  });

  const [errors, setErrors] = React.useState({});
  const handleCreate = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "Field required";
    if (!form.lastName) newErrors.lastName = "Field required";
    if (!form.email) newErrors.email = "Field required";
    if (!form.phoneNumber) newErrors.phoneNumber = "Field required";
    if (!form.role) newErrors.role = "Field required";
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
      <Path title="Invite User" path="Home / Users / Invite new user" />

      <FullCard title="User details">
        <Grid container spacing={2} columns={16} mb="20px">
          <Grid item xs={16} md={8}>
            <Box mb="10px">
              <Typography variant="body1" color="initial">
                First name
                <Typography variant="span" color="error">
                  {" *"}
                </Typography>
              </Typography>
            </Box>
            <TextField
              type="text"
              required
              name="firstName"
              value={form.firstName}
              onChange={handleFormChange}
              label="First name"
              size="small"
              error={!!errors.firstName}
              helperText={errors.firstName}
              fullWidth
            />
          </Grid>
          <Grid item xs={16} md={8}>
            <Box mb="10px">
              <Typography variant="body1" color="initial">
                Last name
                <Typography variant="span" color="error">
                  {" *"}
                </Typography>
              </Typography>
            </Box>
            <TextField
              type="text"
              required
              name="lastName"
              value={form.lastName}
              onChange={handleFormChange}
              label="Last name"
              size="small"
              error={!!errors.lastName}
              helperText={errors.lastName}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} columns={16}>
          <Grid item xs={16} md={5.3}>
            <Box mb="10px">
              <Typography variant="body1" color="initial">
                Email
                <Typography variant="span" color="error">
                  {" *"}
                </Typography>
              </Typography>
            </Box>
            <TextField
              type="text"
              required
              name="email"
              value={form.email}
              onChange={handleFormChange}
              label="mail@email.com"
              size="small"
              error={!!errors.email || errorEmail}
              helperText={errors.email || (errorEmail && "Email Exist")}
              fullWidth
            />
          </Grid>
          <Grid item xs={16} md={5.3}>
            <Box mb="10px">
              <Typography variant="body1" color="initial">
                Phone
                <Typography variant="span" color="error">
                  {" *"}
                </Typography>
              </Typography>
            </Box>
            <TextField
              type="text"
              required
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleFormChange}
              label="Phone Number"
              size="small"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              fullWidth
            />
          </Grid>
          <Grid item xs={16} md={5.3}>
            <Box mb="10px">
              <Typography variant="body1" color="initial">
                User Type
                <Typography variant="span" color="error">
                  {" *"}
                </Typography>
              </Typography>
            </Box>
            <FormControl sx={{ minWidth: 220 }} size="small" fullWidth>
              <InputLabel id="demo-select-small-label">User Type</InputLabel>
              <Select
                name="role"
                onChange={handleFormChange}
                value={form.role}
                label="User Type"
                error={!!errors.role}
                helperText={errors.role}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Owner">Owner</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box display="flex" columnGap="20px" mt="20px">
          <Button
            variant="contained"
            sx={{ width: "120px", textTransform: "none" }}
            onClick={handleCreate}
            type="submit"
          >
            Invite
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "120px", textTransform: "none" }}
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </Box>
      </FullCard>
    </>
  );
};

export default InviteUser;
