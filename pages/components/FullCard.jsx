import {
  Card,
  Container,
  FormControlLabel,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";

const FullCard = ({
  children,
  title,
  isSwitch = false,
  textSwitch = "",
  checked,
}) => {
  return (
    <Container>
      <Paper
        sx={{
          padding: "10px",
          bgcolor: "#E0E0E0",
          display: "flex",
          justifyContent: "space-between",
          px: "40px",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {isSwitch && (
          <FormControlLabel
            control={<Switch defaultChecked />}
            defaultChecked
            label={textSwitch}
          />
        )}
      </Paper>
      <Card
        component="form"
        sx={{ paddingInline: "40px", paddingBlock: "20px" }}
      >
        {children}
      </Card>
    </Container>
  );
};

export default FullCard;
