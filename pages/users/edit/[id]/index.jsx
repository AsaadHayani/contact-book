import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { axiosInstance } from "@/pages/api/api";
import Path from "@/pages/components/Path";
import Loading from "@/pages/components/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Error from "@/pages/components/Error";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;

  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const fetchContact = async () => {
    const response = await axiosInstance.get(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: user, isLoading, error, isError } = useQuery({
    queryFn: fetchContact,
    queryKey: ["user", id],
  });

  const [form, setForm] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        ...user,
        statusSwitch: user.status === "Active" ? true : false,
      });
    }
  }, [user]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSwitchChange = () => {
    setForm((prevForm) => ({
      ...prevForm,
      statusSwitch: !prevForm.statusSwitch,
      status: !prevForm.statusSwitch ? "Locked" : "Active",
    }));
  };

  const editUser = async () => {
    const response = await axiosInstance.put(
      `users/${id}`,
      {
        ...form,
        status: form.statusSwitch ? "Active" : "Locked",
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
  const {
    mutate,
    isPending,
    isError: isErrorPage,
    error: errorPage,
  } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("edit user success");
      router.back();
    },
    onError: (error) => {
      console.log(error);
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
    if (!form.status) newErrors.status = "Field required";
    if (!form.role) newErrors.role = "Field required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      mutate(form);
      console.log(form);
    }
  };

  return (
    <>
      {isPending && <Loading open={isPending} />}
      {isErrorPage && <Error error={errorPage} />}
      {isLoading && <Loading open={isLoading} />}
      {isError && <Error error={error.message} />}
      <Path title="User Edit" path="Home / Users / Edit" />

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
          <Typography variant="h6">User Details</Typography>

          <FormControlLabel
            label={form.statusSwitch ? "Active" : "Locked"}
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
          <Grid container spacing={2} columns={16} mb="20px">
            <Grid item xs={16} md={8}>
              <Box mb="10px">
                <Typography variant="body1" color="initial">
                  First name
                </Typography>
              </Box>
              <TextField
                type="text"
                onChange={handleFormChange}
                name="firstName"
                required
                value={form.firstName || ""}
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
                </Typography>
              </Box>
              <TextField
                type="text"
                onChange={handleFormChange}
                name="lastName"
                required
                value={form.lastName || ""}
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
                </Typography>
              </Box>
              <TextField
                type="email"
                onChange={handleFormChange}
                name="email"
                required
                value={form.email || ""}
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
                </Typography>
              </Box>
              <TextField
                type="text"
                name="phoneNumber"
                onChange={handleFormChange}
                required
                value={form.phoneNumber || ""}
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
                </Typography>
              </Box>
              <FormControl sx={{ minWidth: 220 }} size="small" fullWidth>
                <Select
                  onChange={handleFormChange}
                  name="role"
                  value={form.role || ""}
                >
                  <MenuItem value="Owner">Owner</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box display="flex" columnGap="20px" mt="20px">
            {(cookie.get("role") === "Admin" && user.role === "User") ||
              (cookie.get("role") === "Owner" && (
                <Button
                  variant="contained"
                  sx={{ px: "30px", textTransform: "none" }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              ))}
            <Button
              variant="outlined"
              sx={{ px: "30px", textTransform: "none" }}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Edit;
