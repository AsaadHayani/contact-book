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

const cards = [
  {
    color: "#00AC69",
    icon: generateIcon(ArrowUpwardRounded, "#00AC69"),
  },
  {
    color: "#FC766A",
    icon: generateIcon(ArrowDownward, "#FC766A"),
  },
  {
    color: "#2C3E50",
    icon: generateIcon(Email, "#2C3E50"),
  },
  {
    color: "#5B84B1",
    icon: generateIcon(Close, "#5B84B1"),
  },
];

const CardsHome = ({ latestFourLogs }) => {
  return (
    <Grid item xs={12} md={6}>
      <Grid container spacing={3}>
        {latestFourLogs.map((log, i) => {
          return (
            <Grid item xs={12} md={6} key={log.id}>
              <Paper
                sx={{
                  p: 2,
                  margin: "auto",
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: cards[i].color,
                  color: "white",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography color="inherit" variant="h5">
                          {log.by}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ opacity: 0.5, mb: "10px", mt: "5px" }}
                        >
                          {log.action}
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
                    <Grid item>{cards[i].icon}</Grid>
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
