import React from "react";
import FullCard from "../../components/FullCard";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { EditOffOutlined } from "@mui/icons-material";
import Path from "../../components/Path";
import { useRouter } from "next/router";
import axiosInstance from "@/pages/components/api";
import Cookies from "universal-cookie";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/pages/components/Loading";
import Error from "@/pages/components/Error";

const DetailsUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const fetchUser = async () => {
    const response = await axiosInstance.get(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: user, isPending, error, isError } = useQuery({
    queryFn: fetchUser,
    queryKey: ["user", id],
  });

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
      {isError && <Error error={error} />}

      <Path title="User Details" path="Home / Users / Details" />

      <FullCard title="User Details" element={switchElement(user?.role)}>
        <Grid container spacing={2} columns={16} mb="20px">
          <Grid item xs={16} md={8}>
            <Box mb="10px">
              <Typography variant="body1" color="initial">
                First name
              </Typography>
            </Box>
            <Typography variant="body1" className="text-field">
              {user?.firstName}
            </Typography>
          </Grid>
          <Grid item xs={16} md={8}>
            <Box mb="10px">
              <Typography variant="body1" color="initial">
                Last name
              </Typography>
            </Box>
            <Typography variant="body1" className="text-field">
              {user?.lastName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={16} md={5.3}>
            <Box mb="10px">
              <Typography variant="body1" color="initial">
                Email
              </Typography>
            </Box>
            <Typography variant="body1" className="text-field">
              {user?.email}
            </Typography>
          </Grid>
          <Grid item xs={16} md={5.3}>
            <Box mb="10px">
              <Typography variant="body1" color="initial">
                Phone
              </Typography>
            </Box>
            <Typography variant="body1" className="text-field">
              {user?.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={16} md={5.3}>
            <Box mb="10px">
              <Typography variant="body1" color="initial">
                User Type
              </Typography>
            </Box>
            <Typography variant="body1" className="text-field">
              {user?.role}
            </Typography>
          </Grid>
        </Grid>
        <Box display="flex" columnGap="20px" mt="20px">
          <Button
            variant="outlined"
            sx={{ width: "120px", textTransform: "none" }}
            startIcon={<EditOffOutlined sx={{ fontSize: "18px" }} />}
            onClick={() => router.push(`/users/edit/${user?.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "120px", textTransform: "none" }}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Box>
      </FullCard>
    </>
  );
};

export default DetailsUser;
