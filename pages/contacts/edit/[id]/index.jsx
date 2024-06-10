import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Path from "@/pages/components/Path";
import axiosInstance from "@/pages/components/api";
import { grey } from "@mui/material/colors";
import Loading from "@/pages/components/Loading";
import Error from "@/pages/components/Error";
import Image from "next/image";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = useState("");

  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const fetchContact = async () => {
    const response = await axiosInstance.get(`contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: contact, isLoading, isError, error } = useQuery({
    queryFn: fetchContact,
    queryKey: ["contact", id],
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(e.target.files.item(0));
    }
  };

  const [form, setForm] = useState({});

  useEffect(() => {
    if (contact) {
      setForm({
        ...contact,
        statusSwitch: contact.status === "Active" ? true : false,
      });
    }
  }, [contact]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSwitchChange = () => {
    setForm((prevForm) => ({
      ...prevForm,
      statusSwitch: !prevForm.statusSwitch,
      status: !prevForm.statusSwitch ? "Active" : "Inactive",
    }));
  };

  const [errorEmail, setErrorEmail] = useState(false);
  const editContact = async () => {
    const response = await axiosInstance.put(
      `contacts/${id}`,
      { ...form, status: form.statusSwitch ? "Active" : "Inactive" },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    isError: isErrorPage,
    error: errorPage,
  } = useMutation({
    mutationFn: editContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      console.log("edit contact success");
      router.back();
    },
    onError: (error) => {
      if (
        error.response.data ===
        "The updated email is already associated with another contact."
      )
        setErrorEmail(true);
    },
  });

  const [errors, setErrors] = React.useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "Field required";
    if (!form.lastName) newErrors.lastName = "Field required";
    if (!form.email) newErrors.email = "Field required";
    if (!form.phoneNumber) newErrors.phoneNumber = "Field required";
    if (!form.address) newErrors.address = "Field required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
    }
    mutate(form);
  };

  return (
    <>
      {isPending && <Loading open={isPending} />}
      {isErrorPage && <Error error={errorPage} />}
      {isLoading && <Loading open={isLoading} />}
      {isError && <Error error={error.message} />}
      <Path title="Contact details" path="Home / Contacts / Ricardo" />

      <Container>
        <Paper
          component="form"
          sx={{
            padding: "10px",
            bgcolor: "#E0E0E0",
            display: "flex",
            justifyContent: "space-between",
            px: "40px",
          }}
        >
          <Typography variant="h6">Contact details</Typography>

          <FormControlLabel
            label={form.statusSwitch ? "Active" : "Inactive"}
            labelPlacement="start"
            control={
              <Switch
                checked={form.statusSwitch || false}
                onChange={handleSwitchChange}
              />
            }
          />
        </Paper>
        <Card sx={{ paddingInline: "40px", paddingBlock: "20px" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 8, md: 12 }}
            textAlign="center"
          >
            <Grid item xs={12} md={4}>
              <img
                alt=""
                src={
                  contact?.image != ""
                    ? "/images/Placeholder.jpg"
                    : contact?.image
                }
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
                <Button
                  variant="contained"
                  component="span"
                  sx={{ textTransform: "none" }}
                >
                  Upload new image
                </Button>
              </label>
            </Grid>

            <Grid item xs={12} sm={8} md={4} textAlign="center">
              <Box mb="20px">
                <Box mb="10px" textAlign="start">
                  <Typography variant="body1" color="initial">
                    First name
                  </Typography>
                </Box>
                <TextField
                  type="text"
                  onChange={handleFormChange}
                  name="firstName"
                  value={form.firstName || ""}
                  size="small"
                  fullWidth
                />
              </Box>
              <Box mb="20px">
                <Box mb="10px" textAlign="start">
                  <Typography variant="body1" color="initial">
                    Email
                  </Typography>
                </Box>
                <TextField
                  type="email"
                  value={form.email || ""}
                  onChange={handleFormChange}
                  name="email"
                  error={errorEmail}
                  helperText={errorEmail && "Email Exist"}
                  size="small"
                  fullWidth
                />
              </Box>
              <Box mb="20px">
                <Box mb="10px" textAlign="start">
                  <Typography variant="span" color="initial">
                    Email 2{" "}
                  </Typography>
                  <Typography variant="span" color={grey[700]}>
                    (Optional)
                  </Typography>
                </Box>
                <TextField
                  type="email"
                  value={form.emailTwo}
                  onChange={handleFormChange}
                  name="emailTwo"
                  size="small"
                  fullWidth
                />
              </Box>
              <Box mb="20px">
                <Box mb="10px" textAlign="start">
                  <Typography variant="body1" color="initial">
                    Address
                  </Typography>
                </Box>
                <TextField
                  type="text"
                  value={form.address || ""}
                  onChange={handleFormChange}
                  name="address"
                  size="small"
                  fullWidth
                />
              </Box>
              <Box
                columnGap="20px"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                {cookie.get("role") !== "User" && (
                  <Button
                    variant="contained"
                    sx={{ px: "30px", textTransform: "none" }}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                )}
                <Button
                  variant="outlined"
                  sx={{ px: "30px", textTransform: "none" }}
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
                  </Typography>
                </Box>
                <TextField
                  type="text"
                  size="small"
                  fullWidth
                  value={form.lastName || ""}
                  onChange={handleFormChange}
                  name="lastName"
                />
              </Box>
              <Box mb="20px">
                <Box mb="10px" textAlign="start">
                  <Typography variant="body1" color="initial">
                    Phone
                  </Typography>
                </Box>
                <TextField
                  type="text"
                  value={form.phoneNumber || ""}
                  onChange={handleFormChange}
                  name="phoneNumber"
                  size="small"
                  fullWidth
                />
              </Box>
              <Box mb="20px">
                <Box mb="10px" textAlign="start">
                  <Typography variant="span" color="initial">
                    Mobile{" "}
                  </Typography>
                  <Typography variant="span" color={grey[700]}>
                    (Optional)
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
                  <Typography variant="span" color="initial">
                    Address 2{" "}
                  </Typography>
                  <Typography variant="span" color={grey[700]}>
                    (Optional)
                  </Typography>
                </Box>
                <TextField
                  type="text"
                  value={form.addressTwo}
                  onChange={handleFormChange}
                  name="addressTwo"
                  size="small"
                  fullWidth
                />
              </Box>
              <Box gap="20px" sx={{ display: { xs: "flex", md: "none" } }}>
                {cookie.get("role") !== "User" && (
                  <Button
                    variant="contained"
                    sx={{ px: "30px", textTransform: "none" }}
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Save
                  </Button>
                )}
                <Button
                  variant="outlined"
                  sx={{ px: "30px", textTransform: "none" }}
                  onClick={() => router.back()}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default Edit;
