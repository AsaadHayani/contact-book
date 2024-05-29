import React from "react";
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import FullCard from "../components/FullCard";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { EditOffOutlined } from "@mui/icons-material";
import Path from "../components/Path";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import axiosInstance from "../components/api";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const router = useRouter();

  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const fetchProfile = async () => {
    const response = await axiosInstance.get(`companies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: profile, isLoading, error, isError } = useQuery({
    queryFn: () => fetchProfile(),
    queryKey: ["company"],
  });

  if (isError) return alert(`Error: ${error.message}`);
  if (isLoading)
    return (
      <Typography variant="h4" textAlign="center" color="error">
        Loading...
      </Typography>
    );
  return (
    <>
      <Path title="Company Profile" path="Home / Company Profile" />

      <FullCard title="My Profile">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          alignItems="center"
        >
          <Grid item xs={12} sm={8} md={4}>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="p" color="initial">
                  Company Name
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {profile?.companyName}
              </Typography>
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="p" color="initial">
                  Street
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {profile?.streetOne}
              </Typography>
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="p" color="initial">
                  City
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {profile?.city}
              </Typography>
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="p" color="initial">
                  Zip
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {profile?.zip}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{ width: "120px", display: { xs: "none", md: "flex" } }}
              startIcon={<EditOffOutlined sx={{ fontSize: "18px" }} />}
              onClick={() => router.push(`/profile/${profile?.id}`)}
            >
              Edit
            </Button>
          </Grid>

          <Grid item xs={12} sm={8} md={4}>
            <Box mb="20px">
              <Box mb="10px" textAlign="left">
                <Typography variant="p" color="initial">
                  VAT Number
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {profile?.vatNumber}
              </Typography>
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="left">
                <Typography variant="p" color="initial">
                  Street 2
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {profile?.streetTwo}
              </Typography>
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="left">
                <Typography variant="p" color="initial">
                  State
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {profile?.state}
              </Typography>
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="left">
                <Typography variant="p" color="initial">
                  Country
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {profile?.country}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4} textAlign="center">
            <img src="/images/Placeholder.jpg" width={200} height={200} />
          </Grid>

          <Box
            sx={{
              display: { xs: "block", md: "none" },
              textAlign: "center",
              mt: "20px",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              sx={{ width: "120px" }}
              startIcon={<EditOffOutlined sx={{ fontSize: "18px" }} />}
              onClick={() => router.push(`/profile/${profile?.id}`)}
            >
              Edit
            </Button>
          </Box>
        </Grid>
      </FullCard>
    </>
  );
};

export default Index;
