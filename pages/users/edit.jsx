import React from "react";
import Title from "../components/Title";
import Navbar from "../components/Navbar";
import FullCard from "../components/FullCard";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { EditOffOutlined } from "@mui/icons-material";
import Path from "../components/Path";
import { useRouter } from "next/router";

const Edit = () => {
  const router = useRouter();
  return (
    <>
      <Path title="User Edit" path="Home / Users / Edit" />

      <FullCard title="User Details" isSwitch={true} textSwitch="Unlocked">
        <Grid container spacing={2} columns={16} mb="20px">
          <Grid item xs={8}>
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
          </Grid>
          <Grid item xs={8}>
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
          </Grid>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
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
              label="mail@email.com"
              size="small"
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Box mb="10px">
              <Typography variant="p" color="initial">
                Phone
                <Typography variant="p" color="error">
                  {" "}
                  *
                </Typography>
              </Typography>
            </Box>
            <TextField id="outlined-basic" label="Phone Number" size="small" />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Box mb="10px">
              <Typography variant="p" color="initial">
                User Type
                <Typography variant="p" color="error">
                  {" "}
                  *
                </Typography>
              </Typography>
            </Box>
            <FormControl sx={{ m: 2, minWidth: 220 }} size="small">
              <InputLabel id="demo-select-small-label">User Type</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={age}
                label="Aged"
                // onChange={handleChange}
              >
                <MenuItem value="">Ten</MenuItem>
                <MenuItem value="">Twenty</MenuItem>
                <MenuItem value="">Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box display="flex" columnGap="20px">
          <Button variant="contained" sx={{ width: "120px" }}>
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
      </FullCard>
    </>
  );
};

export default Edit;
