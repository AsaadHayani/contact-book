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

const InviteUser = () => {
  const [form, setForm] = useState({
    firstName: "asaad",
    lastName: "hayani",
    email: "asaad99hayani@gmail.com",
    emailTwo: "",
    mobileNumber: "123456789",
    phoneNumber: "12345",
    address: "address",
    addressTwo: "address2",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(e.target.files.item(0));
    }
  };
  const router = useRouter();
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const createInviteUser = async () => {
    const response = await axiosInstance.post(
      `contacts`,
      {
        // FirstName: form.firstName,
        // LastName: form.lastName,
        // Email: form.email,
        // emailTwo: form.emailTwo,
        // mobileNumber: form.mobileNumber,
        // PhoneNumber: form.phoneNumber,
        // Address: form.address,
        // addressTwo: form.addressTwo,
        FirstName: "asaad",
        LastName: "xv",
        Email: "as555@g.com",
        PhoneNumber: "123",
        Address: "xv",
      },
      {
        headers: {
          Accept: "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const queryClient = useQueryClient();
  const createContactMutation = useMutation({
    mutationFn: createInviteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invite-user"] });
      console.log("success");
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    console.log(form);
    createContactMutation.mutate(form);
  };

  return (
    <>
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
              id="outlined-basic"
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
              id="outlined-basic"
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
              id="outlined-basic"
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
              id="outlined-basic"
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
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="User Type"
              >
                <MenuItem value="">Ten</MenuItem>
                <MenuItem value="">Twenty</MenuItem>
                <MenuItem value="">Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box display="flex" columnGap="20px" mt="20px">
          <Button variant="contained" sx={{ width: "120px" }}>
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
