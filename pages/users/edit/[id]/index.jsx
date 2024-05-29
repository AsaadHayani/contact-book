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
import { useMutation, useQuery } from "@tanstack/react-query";

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

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});

  const editUser = async () => {
    const response = await axiosInstance.put(
      `users/${id}`,
      {
        // firstName: form.firstName,
        // lastName: form.lastName,
        // email: form.email,
        // phoneNumber: form.phoneNumber,
        // address: form.address,
        FirstName: "asaad",
        LastName: "xv",
        Email: "as555@g.com",
        PhoneNumber: "123",
        role: "User",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const editUserMutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      setLoading(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editUserMutation.mutate(form);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  if (isError) return alert(`Error: ${error.message}`);
  if (isLoading) return <Loading open={loading} setOpen={setLoading} />;

  return (
    <>
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
              value={user?.firstName}
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
              value={user?.lastName}
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
              value={user?.email}
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
              value={user?.phoneNumber}
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
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={user?.role || ""}
              >
                <MenuItem value="Owner">Ten</MenuItem>
                <MenuItem value="Admin">Twenty</MenuItem>
                <MenuItem value="Active">Thirty</MenuItem>
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
