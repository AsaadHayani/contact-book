import React, { useState } from "react";
import Title from "../components/Title";
import Navbar from "../components/Navbar";
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
import axiosInstance from "../components/api";
import Loading from "../components/Loading";

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

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createInviteUser,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invite-user"] });
      router.push(`/users`);
      setLoading(false);
      console.log("invite user success");
    },
    onError: (error) => {
      alert("invite user error:", error);
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <>
      {loading && <Loading open={loading} setOpen={setLoading} />}
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
            sx={{ width: "120px" }}
            onClick={handleCreate}
            type="submit"
          >
            Invite
          </Button>
          <Button variant="outlined" sx={{ width: "120px" }}>
            Cancel
          </Button>
        </Box>
      </FullCard>
    </>
  );
};

export default InviteUser;
