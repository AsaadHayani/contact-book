import React from "react";
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import FullCard from "../components/FullCard";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { EditOffOutlined } from "@mui/icons-material";
import Path from "../components/Path";

const Index = () => {
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
          <Grid item xs={2} sm={4} md={4}>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  Company Name
                </Typography>
              </Box>
              <TextField
                id="outlined-basic"
                label="Company Name"
                size="small"
              />
            </Box>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  Street
                </Typography>
              </Box>
              <TextField id="outlined-basic" label="Street" size="small" />
            </Box>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  City
                </Typography>
              </Box>
              <TextField id="outlined-basic" label="city" size="small" />
            </Box>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  Zip
                </Typography>
              </Box>
              <TextField id="outlined-basic" label="00000" size="small" />
            </Box>
            <Button
              variant="outlined"
              sx={{ width: "120px" }}
              startIcon={<EditOffOutlined sx={{ fontSize: "18px" }} />}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  VAT Number
                </Typography>
              </Box>
              <TextField id="outlined-basic" label="00000" size="small" />
            </Box>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  Street 2
                </Typography>
              </Box>
              <TextField id="outlined-basic" label="Street 2" size="small" />
            </Box>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  State
                </Typography>
              </Box>
              <TextField id="outlined-basic" label="State" size="small" />
            </Box>
            <Box mb="20px">
              <Box mb="10px">
                <Typography variant="p" color="initial">
                  Country
                </Typography>
              </Box>
              <TextField id="outlined-basic" label="Country" size="small" />
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={4} textAlign="center">
            <Image src="/images/Placeholder.jpg" width={200} height={200} />
          </Grid>
        </Grid>
      </FullCard>
    </>
  );
};

export default Index;
