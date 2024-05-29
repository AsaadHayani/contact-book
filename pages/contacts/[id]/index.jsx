import React from "react";
import FullCard from "../../components/FullCard";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { EditOffOutlined } from "@mui/icons-material";
import Path from "../../components/Path";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import axiosInstance from "../../components/api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;

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

  const { data: contact, isLoading, error, isError } = useQuery({
    queryFn: () => fetchContact(),
    queryKey: ["contact", id],
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
      <Path title="Contact details" path="Home / Contacts / Ricardo" />

      <FullCard
        title="Contact details"
        isSwitch={true}
        checked="Active"
        textSwitch="Active"
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 8, md: 12 }}
          textAlign="center"
        >
          <Grid item xs={12} md={4}>
            {contact?.image != null ? (
              <img
                src="/images/Person.png"
                width={200}
                height={200}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <img
                src="/images/Placeholder.jpg"
                width={200}
                height={200}
                style={{ borderRadius: "50%" }}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={8} md={4} textAlign="center">
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  First name
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {contact?.firstName}
              </Typography>
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Email
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {contact?.email}
              </Typography>
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Email 2
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {contact?.emailTwo == null ? "- Nothing -" : contact?.emailTwo}
              </Typography>
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Address
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {contact?.address}
              </Typography>
            </Box>
            <Box columnGap="20px" sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="outlined"
                sx={{ width: "120px" }}
                startIcon={<EditOffOutlined />}
                onClick={() => router.push(`/contacts/edit/${contact?.id}`)}
              >
                Edit
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
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {contact?.lastName}
              </Typography>
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Phone
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {contact?.phoneNumber}
              </Typography>
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Mobile
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {contact?.mobileNumber == null
                  ? "- Nothing -"
                  : contact?.mobileNumber}
              </Typography>
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Address 2
                </Typography>
              </Box>
              <Typography variant="body1" className="text-field">
                {contact?.addressTwo == null
                  ? "- Nothing -"
                  : contact?.addressTwo}
              </Typography>
            </Box>
            <Box columnGap="20px" sx={{ display: { xs: "flex", md: "none" } }}>
              <Button
                variant="outlined"
                sx={{ width: "120px" }}
                startIcon={<EditOffOutlined />}
                onClick={() => router.push(`/contacts/edit/${contact?.id}`)}
              >
                Edit
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

export default Details;
