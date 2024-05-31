import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import FullCard from "../components/FullCard";
import Path from "../components/Path";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import axiosInstance from "../components/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Create = () => {
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
  const [image, setImage] = useState("");

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

  const createContact = async () => {
    // const formData = new FormData();
    // formData.append("firstName", form.firstName);
    // formData.append("lastName", form.lastName);
    // formData.append("email", form.email);
    // formData.append("emailTwo", form.emailTwo);
    // formData.append("mobileNumber", form.mobileNumber);
    // formData.append("phoneNumber", form.phoneNumber);
    // formData.append("address", form.address);
    // formData.append("addressTwo", form.addressTwo);
    // formData.append("image", image);
    const response = await axiosInstance.post(
      `contacts`,
      {
        FirstName: form.firstName,
        LastName: form.lastName,
        Email: form.email,
        emailTwo: form.emailTwo,
        mobileNumber: form.mobileNumber,
        PhoneNumber: form.phoneNumber,
        Address: form.address,
        addressTwo: form.addressTwo,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      console.log("create contact successfully");
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    console.log(form);
    mutate(form);
  };
  return (
    <>
      <Path title="Contact details" path="Home / Contacts / Create New" />

      <FullCard title="Contact details">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 8, md: 12 }}
          textAlign="center"
        >
          <Grid item xs={12} md={4}>
            <img
              src="/images/Placeholder.jpg"
              width={200}
              height={200}
              style={{ borderRadius: "50%" }}
            />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="h6"
              my="10px"
            >
              JPG or PNG no larger than 5 MB
            </Typography>
            <label htmlFor="file-upload">
              <input
                accept="image/*"
                id="file-upload"
                style={{ display: "none" }}
                type="file"
                onChange={handleFileChange}
              />
              <Button variant="contained" component="span">
                Upload new image
              </Button>
            </label>
          </Grid>

          <Grid item xs={12} sm={8} md={4} textAlign="center">
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  First name
                  <Typography variant="span" color="error">
                    {" *"}
                  </Typography>
                </Typography>
              </Box>
              <TextField
                type="text"
                value={form.firstName}
                onChange={handleFormChange}
                name="firstName"
                label="First name"
                size="small"
                fullWidth
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Email
                  <Typography variant="span" color="error">
                    {" *"}
                  </Typography>
                </Typography>
              </Box>
              <TextField
                type="email"
                value={form.email}
                onChange={handleFormChange}
                name="email"
                label="name@example.com"
                size="small"
                fullWidth
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Email 2
                </Typography>
              </Box>
              <TextField
                type="email"
                value={form.emailTwo}
                onChange={handleFormChange}
                name="emailTwo"
                label="name@example.com"
                size="small"
                fullWidth
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Address
                  <Typography variant="span" color="error">
                    {" *"}
                  </Typography>
                </Typography>
              </Box>
              <TextField
                type="text"
                label="Address"
                value={form.address}
                onChange={handleFormChange}
                name="address"
                size="small"
                fullWidth
              />
            </Box>
            <Box columnGap="20px" sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="contained"
                onClick={handleCreate}
                sx={{ width: "120px" }}
                type="submit"
              >
                Create
              </Button>
              <Button
                variant="outlined"
                sx={{ width: "120px" }}
                onClick={() => router.back()}
              >
                Back
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} sm={8} md={4}>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Last name
                  <Typography variant="span" color="error">
                    {" *"}
                  </Typography>
                </Typography>
              </Box>
              <TextField
                type="text"
                label="Last name"
                size="small"
                fullWidth
                value={form.lastName}
                onChange={handleFormChange}
                name="lastName"
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Phone
                  <Typography variant="span" color="error">
                    {" *"}
                  </Typography>
                </Typography>
              </Box>
              <TextField
                type="text"
                label="555-123-4567"
                value={form.phoneNumber}
                onChange={handleFormChange}
                name="phoneNumber"
                size="small"
                fullWidth
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Mobile
                </Typography>
              </Box>
              <TextField
                type="text"
                label="555-123-4567"
                value={form.mobileNumber}
                onChange={handleFormChange}
                name="mobileNumber"
                size="small"
                fullWidth
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Address 2
                </Typography>
              </Box>
              <TextField
                type="text"
                label="Address 2"
                value={form.addressTwo}
                onChange={handleFormChange}
                name="addressTwo"
                size="small"
                fullWidth
              />
            </Box>
            <Box gap="20px" sx={{ display: { xs: "flex", md: "none" } }}>
              <Button
                variant="contained"
                onClick={handleCreate}
                sx={{ width: "120px" }}
                type="submit"
              >
                Create
              </Button>
              <Button
                variant="outlined"
                sx={{ width: "120px" }}
                onClick={() => router.back()}
              >
                Back
              </Button>
            </Box>
          </Grid>
        </Grid>
      </FullCard>
    </>
  );
};

export default Create;
