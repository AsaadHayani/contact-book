import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Cookies from "universal-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Path from "@/pages/components/Path";
import FullCard from "@/pages/components/FullCard";
import { axiosInstance } from "@/pages/api/api";
import Loading from "@/pages/components/Loading";
import Error from "@/pages/components/Error";

const Edit = () => {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const fetchContact = async () => {
    const response = await axiosInstance.get(`companies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: company, isPending, error, isError } = useQuery({
    queryFn: fetchContact,
    queryKey: ["company"],
  });

  const [form, setForm] = useState({});

  useEffect(() => {
    if (company) {
      setForm(company);
    }
  }, [company]);

  const editCompanies = async () => {
    const response = await axiosInstance.put(`companies`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const queryClient = useQueryClient();
  const {
    mutate,
    isPending: isPendingPage,
    isError: isErrorPage,
    error: errorPage,
  } = useMutation({
    mutationFn: editCompanies,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      console.log("edit contact success");
      router.back();
    },
  });

  const [errors, setErrors] = React.useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const [userRole, setUserRole] = useState("User");
  useEffect(() => {
    setUserRole(cookie.get("role"));
  }, [cookie.get("role")]);

  return (
    <>
      {isPendingPage && <Loading open={isPendingPage} />}
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error.message} />}

      <Path title="Contact details" path="Home / Contacts / Ricardo" />

      <FullCard title="Contact details">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 8, md: 12 }}
          alignItems="center"
        >
          <Grid item xs={12} sm={8} md={4} textAlign="center">
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Company Name
                </Typography>
              </Box>
              <TextField
                type="text"
                name="companyName"
                value={form.companyName || ""}
                onChange={handleFormChange}
                size="small"
                error={!!errors.companyName}
                helperText={errors.companyName}
                fullWidth
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  VAT Number
                </Typography>
              </Box>
              <TextField
                type="text"
                value={form.vatNumber || ""}
                onChange={handleFormChange}
                name="vatNumber"
                size="small"
                fullWidth
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="span" color="initial">
                  Street One
                </Typography>
              </Box>
              <TextField
                type="text"
                value={form.streetOne || ""}
                onChange={handleFormChange}
                name="streetOne"
                size="small"
                fullWidth
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  Street Two
                </Typography>
              </Box>
              <TextField
                type="text"
                value={form.streetTwo || ""}
                onChange={handleFormChange}
                name="streetTwo"
                size="small"
                fullWidth
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={8} md={4}>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  City
                </Typography>
              </Box>
              <TextField
                type="text"
                size="small"
                fullWidth
                value={form.city || ""}
                name="city"
                onChange={handleFormChange}
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="body1" color="initial">
                  State
                </Typography>
              </Box>
              <TextField
                type="text"
                value={form.state || ""}
                name="state"
                size="small"
                fullWidth
                onChange={handleFormChange}
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="span" color="initial">
                  Zip
                </Typography>
              </Box>
              <TextField
                type="text"
                label="555-123-4567"
                value={form.zip || ""}
                onChange={handleFormChange}
                name="zip"
                size="small"
                fullWidth
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px" textAlign="start">
                <Typography variant="span" color="initial">
                  Country
                </Typography>
              </Box>
              <TextField
                type="text"
                value={form.country || ""}
                name="country"
                onChange={handleFormChange}
                size="small"
                fullWidth
              />
            </Box>
            <Box gap="20px" sx={{ display: { xs: "flex", md: "none" } }}>
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
        </Grid>
        <Box columnGap="20px" sx={{ display: { xs: "none", md: "flex" } }}>
          {userRole === "Owner" && (
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
      </FullCard>
    </>
  );
};

export default Edit;
