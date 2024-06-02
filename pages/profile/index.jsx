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
import Loading from "../components/Loading";
import Error from "../components/Error";

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

  const { data: profile, isPending, error, isError } = useQuery({
    queryFn: () => fetchProfile(),
    queryKey: ["company"],
  });
  return (
    <>
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error} />}

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
              onClick={() => router.push(`/profile/edit`)}
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25846.642137013932!2d36.61496877645529!3d35.9266543924818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152508664354cbdf%3A0xc44836a7b49c636f!2sIdlib%2C%20Syria!5e0!3m2!1sen!2suk!4v1717055728254!5m2!1sen!2suk"
              width="200"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
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
              onClick={() => router.push(`/profile/edit`)}
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
