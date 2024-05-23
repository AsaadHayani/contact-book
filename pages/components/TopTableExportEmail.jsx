import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const TopTableExportEmail = () => {
  return (
    <Box className="top-table">
      <Box>
        <TextField id="outlined-basic" label="Search" size="small" />
      </Box>
      <Box className="top-table">
        <Box className="top-table">
          <CheckCircleOutline color="success" />
          <Typography variant="body1" color="green">
            Email sent successfully
          </Typography>
        </Box>
        <TextField id="outlined-basic" label="name@example.com" size="small" />
        <Button variant="contained">Send</Button>
      </Box>
    </Box>
  );
};

export default TopTableExportEmail;
