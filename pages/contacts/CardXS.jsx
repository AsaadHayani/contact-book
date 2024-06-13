import { Star, StarBorder } from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardXS = ({ contacts, isSelected, handleClick, handleFavorite }) => {
  return (
    <Grid container spacing={2}>
      {contacts?.length !== 0 ? (
        contacts?.map((contact, index) => {
          const isItemSelected = isSelected(contact.id);
          return (
            <Grid item xs={12} key={contact.id}>
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
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, contact.id)}
                      />
                      <IconButton onClick={() => handleFavorite(contact?.id)}>
                        {contact?.isFavorite ? <Star /> : <StarBorder />}
                      </IconButton>
                    </Box>
                    <Divider />
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      py="10px"
                    >
                      <Typography variant="body1">
                        <Alert severity="secondary">
                          {(index + 1).toString().padStart(3, "0")}
                        </Alert>
                      </Typography>
                      <Link
                        href={`/contacts/${contact.id}`}
                        style={{
                          color: "black",
                          textDecoration: "none",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        <img
                          src={
                            contact?.image != ""
                              ? "/images/Placeholder.jpg"
                              : contact?.image
                          }
                          alt="person"
                          width={50}
                          height={50}
                          style={{ borderRadius: "50%" }}
                        />
                        <Typography variant="h5" color="initial">
                          {contact.firstName} {contact.lastName}
                        </Typography>
                      </Link>
                      <Alert
                        icon={false}
                        className={contact.status === "Inactive" && "alert"}
                        severity={contact.status === "Active" ? "success" : ""}
                      >
                        {contact.status}
                      </Alert>
                    </Box>
                    <Divider />
                    <Box textAlign="center" pt="10px">
                      <Typography variant="body2" color="text.secondary">
                        {contact.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {contact.phoneNumber}
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
