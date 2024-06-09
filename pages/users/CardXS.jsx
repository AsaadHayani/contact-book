import {
  Alert,
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const CardXS = ({ users, isSelected, handleClick }) => {
  return (
    <Grid container spacing={2}>
      {users?.length !== 0 ? (
        users?.map((user, index) => {
          const isItemSelected = isSelected(user.id);
          if (user.role !== "Owner")
            return (
              <Grid item xs={12} key={user.id}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        border: 1,
                        borderColor: "#aaa",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <Box>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, user.id)}
                        />
                      </Box>
                      <Divider />
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        py="10px"
                      >
                        <Typography variant="body1">
                          {(index + 1).toString().padStart(3, "0")}
                        </Typography>
                        <Link
                          href={`/users/${user.id}`}
                          style={{
                            color: "black",
                            textDecoration: "none",
                            fontSize: "25px",
                            fontWeight: "bold",
                          }}
                        >
                          {user.firstName} {user.lastName}
                        </Link>
                        <Alert
                          icon={false}
                          severity={
                            user.status === "Pending"
                              ? "success"
                              : user.status === "Active"
                              ? "warning"
                              : user.status === "Locked"
                              ? "info"
                              : user.status === "Email sent"
                              ? "error"
                              : "cyan"
                          }
                        >
                          {user.status}
                        </Alert>
                      </Box>
                      <Divider />
                      <Box textAlign="center" pt="10px">
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.phoneNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
        })
      ) : (
        <Grid item xs={12}>
          <Typography variant="h5" color="error" align="center">
            Items Not Found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default CardXS;
