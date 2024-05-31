import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Path from "@/pages/components/Path";
import FullCard from "@/pages/components/FullCard";
import axiosInstance from "@/pages/components/api";
import { grey } from "@mui/material/colors";
import Loading from "@/pages/components/Loading";

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

  const { data: contact, isLoading, error, isError } = useQuery({
    queryFn: () => fetchContact(),
    queryKey: ["contact", id],
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(e.target.files.item(0));
    }
  };

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});

  const editContact = async () => {
    const response = await axiosInstance.put(
      `contacts/${id}`,
      {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        address: form.address,
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
    mutationFn: editContact,
    onMutate: () => {
      ///////////////////////////////////
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      router.back();
      setLoading(false);
      console.log("edit contact success");
    },
    onError: (error) => {
      alert("edit contact error:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  if (isError) return alert(`Error: ${error.message}`);
  if (isLoading) return <Loading open={loading} setOpen={setLoading} />;

  return (
    <>
      {loading && <Loading open={loading} setOpen={setLoading} />}
      <Path title="Contact details" path="Home / Contacts / Ricardo" />

      <FullCard title="Contact details" isSwitch={true} textSwitch="Active">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 8, md: 12 }}
          textAlign="center"
        >
          <Grid item xs={12} md={4}>
            <img
              src="/images/Person.png"
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
                name="firstName"
                defaultValue={contact?.firstName}
                onChange={handleFormChange}
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
                defaultValue={contact?.email}
                name="email"
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
                defaultValue={
                  contact?.emailTwo == null ? "- Nothing -" : contact?.emailTwo
                }
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
                defaultValue={contact?.address}
                name="address"
                size="small"
                fullWidth
              />
            </Box>
            <Box columnGap="20px" sx={{ display: { xs: "none", md: "flex" } }}>
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
                defaultValue={contact?.lastName}
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
                defaultValue={contact?.phoneNumber}
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
                defaultValue={
                  contact?.mobileNumber == null
                    ? "- Nothing -"
                    : contact?.mobileNumber
                }
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
                defaultValue={
                  contact?.addressTwo == null
                    ? "- Nothing -"
                    : contact?.addressTwo
                }
                name="addressTwo"
                size="small"
                fullWidth
              />
            </Box>
            <Box gap="20px" sx={{ display: { xs: "flex", md: "none" } }}>
              <Button variant="contained" sx={{ width: "120px" }} type="submit">
                Save
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

export default Edit;
