import React from "react";
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import FullCard from "../components/FullCard";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { EditOffOutlined } from "@mui/icons-material";
import Path from "../components/Path";
import { useRouter } from "next/router";

const Details = () => {
  const router = useRouter();
  return (
    <>
      <Path title="Contact details" path="Home / Contacts / Ricardo" />

      <FullCard title="Contact details" isSwitch={true} textSwitch="Active">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4} textAlign="center">
            <Image
              src="/images/Person.png"
              width={200}
              height={200}
              style={{ borderRadius: "50%" }}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  First name
                  <Typography variant="p" color="error">
                    {" "}
                    *
                  </Typography>
                </Typography>
              </Box>
              <TextField id="outlined-basic" label="First name" size="small" />
            </Box>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  Email
                  <Typography variant="p" color="error">
                    {" "}
                    *
                  </Typography>
                </Typography>
              </Box>
              <TextField
                id="outlined-basic"
                label="name@example.com"
                size="small"
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  Email 2
                  <Typography variant="p" color="error">
                    {" "}
                    *
                  </Typography>
                </Typography>
              </Box>
              <TextField
                id="outlined-basic"
                label="name@example.com"
                size="small"
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  Address
                  <Typography variant="p" color="error">
                    {" "}
                    *
                  </Typography>
                </Typography>
              </Box>
              <TextField id="outlined-basic" label="Address" size="small" />
            </Box>
            <Box display="flex" columnGap="20px">
              <Button
                variant="outlined"
                startIcon={<EditOffOutlined />}
                sx={{ width: "120px" }}
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
          <Grid item xs={2} sm={4} md={4}>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  Last name
                  <Typography variant="p" color="error">
                    {" "}
                    *
                  </Typography>
                </Typography>
              </Box>
              <TextField id="outlined-basic" label="Last name" size="small" />
            </Box>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  Phone
                  <Typography variant="p" color="error">
                    {" "}
                    *
                  </Typography>
                </Typography>
              </Box>
              <TextField
                id="outlined-basic"
                label="555-123-4567"
                size="small"
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  Mobile
                  <Typography variant="p" color="error">
                    {" "}
                    *
                  </Typography>
                </Typography>
              </Box>
              <TextField
                id="outlined-basic"
                label="555-123-4567"
                size="small"
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  Address 2
                  <Typography variant="p" color="error">
                    {" "}
                    *
                  </Typography>
                </Typography>
              </Box>
              <TextField id="outlined-basic" label="Address 2" size="small" />
            </Box>
          </Grid>
        </Grid>
      </FullCard>
    </>
  );
};

export default Details;
