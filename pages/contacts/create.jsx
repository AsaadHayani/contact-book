import { Title } from "@mui/icons-material";
import React from "react";
import Navbar from "../components/Navbar";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import FullCard from "../components/FullCard";
import Path from "../components/Path";
import { useRouter } from "next/router";

const Create = () => {
  const router = useRouter();
  return (
    <>
      <Path title="Contact details" path="Home / Contacts / Create New" />

      <FullCard title="Contact details">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4} textAlign="center">
            <Image
              src="/images/Placeholder.jpg"
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
            <Button variant="contained">Upload new image</Button>
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
              <Button variant="contained" sx={{ width: "120px" }}>
                Create
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

export default Create;
