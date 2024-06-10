import { Alert, Snackbar } from "@mui/material";
import React from "react";

const Error = ({ error }) => {
  return (
    <Snackbar open={error} autoHideDuration={3000}>
      <Alert variant="filled" severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};

export default Error;
