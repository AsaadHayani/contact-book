import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
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
  console.log(user);

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

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: editUser,
    onMutate: () => {
      ///////////////////////////////////
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invite-user"] });
      router.back();
      setLoading(false);
      console.log("edit user success");
    },
    onError: (error) => {
      alert("edit user error:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  if (isError) return alert(`Error: ${error.message}`);
  if (isLoading) return <Loading open={loading} setOpen={setLoading} />;

  return (
    <>
      {loading && <Loading open={loading} setOpen={setLoading} />}
      <Path title="User Edit" path="Home / Users / Edit" />

      <FullCard title="User Details" isSwitch={true} textSwitch="Unlocked">
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
