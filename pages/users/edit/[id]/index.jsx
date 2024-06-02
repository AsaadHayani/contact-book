import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import axiosInstance from "@/pages/components/api";
import FullCard from "@/pages/components/FullCard";
import Path from "@/pages/components/Path";
import Loading from "@/pages/components/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const editUser = async () => {
    const response = await axiosInstance.put(
      `users/${id}`,
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

  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    isError: isErrorPage,
    error: errorPage,
  } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invite-user"] });
      router.back();
      console.log("edit user success");
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
    if (!form.role) newErrors.role = "Field required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      mutate(form);
    }
  };

  const switchElement = (checked) => {
    return (
      <FormControlLabel
        control={<Switch checked={checked === "Admin" ? true : false} />}
        label={checked === "Admin" ? "Locked" : "Unlocked"}
      />
    );
  };

  return (
    <>
      {isPending && <Loading open={isPending} />}
      {isErrorPage && <Error error={errorPage} />}
      {isLoading && <Loading open={isLoading} />}
      {isError && <Error error={error} />}
      <Path title="User Edit" path="Home / Users / Edit" />

      <FullCard title="User Details" element={switchElement(user?.role)}>
        <Grid container spacing={2} columns={16} mb="20px">
          <Grid item xs={16} md={8}>
            <Box mb="10px">
              <Typography variant="body1" color="initial">
                First name
              </Typography>
            </Box>
            <TextField
              type="text"
              name="firstName"
              onChange={handleFormChange}
              required
              value={user?.firstName || ""}
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
              name="lastName"
              onChange={handleFormChange}
              required
              value={user?.lastName || ""}
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
              name="email"
              onChange={handleFormChange}
              required
              value={user?.email || ""}
              size="small"
              error={!!errors.email}
              helperText={errors.email}
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
              value={user?.phoneNumber || ""}
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
                value={user?.role || "Owner"}
              >
                <MenuItem value="Owner">Owner</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box display="flex" columnGap="20px" mt="20px">
          <Button
            variant="contained"
            sx={{ width: "120px" }}
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "120px" }}
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </Box>
      </FullCard>
    </>
  );
};

export default Edit;
