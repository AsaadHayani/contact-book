import {
  ArrowDownward,
  ArrowUpwardRounded,
  Close,
  Email,
} from "@mui/icons-material";
import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const generateIcon = (IconComponent, color) => (
  <IconComponent
    sx={{
      backgroundColor: "#eee",
      borderRadius: "50%",
      opacity: "50%",
      fontSize: "30px",
      padding: "5px",
      color: color,
    }}
  />
);

const CardsHome = ({
  activeContacts,
  inactiveContacts,
  emailContacts,
  noEmailContacts,
}) => {
  const cards = [
    {
      number: activeContacts,
      text: "Active",
      color: "#00AC69",
      icon: generateIcon(ArrowUpwardRounded, "#00AC69"),
    },
    {
      number: inactiveContacts,
      text: "Inactive",
      color: "#FC766A",
      icon: generateIcon(ArrowDownward, "#FC766A"),
    },
    {
      number: emailContacts,
      text: "Sent Email",
      color: "#2C3E50",
      icon: generateIcon(Email, "#2C3E50"),
    },
    {
      number: noEmailContacts,
      text: "Without Email",
      color: "#5B84B1",
      icon: generateIcon(Close, "#5B84B1"),
    },
  ];

  return (
    <Grid item xs={12} md={6}>
      <Grid container spacing={3}>
        {cards.map((card, i) => {
          return (
            <Grid item xs={12} md={6} key={i}>
              <Paper
                sx={{
                  p: 2,
                  margin: "auto",
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: card.color,
                  color: "white",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography color="inherit" variant="h5">
                          {card.number == 0 ? "0" : card.number}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ opacity: 0.5, mb: "10px", mt: "5px" }}
                        >
                          {card.text}
                        </Typography>
                        <Typography
                          variant="body2"
                          mt="10px"
                          sx={{ opacity: 0.5 }}
                        >
                          3% from last month
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>{card.icon}</Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default CardsHome;
