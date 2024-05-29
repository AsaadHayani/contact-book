import React from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputLabel,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import Path from "../components/Path";
import { grey } from "@mui/material/colors";

const Index = () => {
  return (
    <>
      <Path title="Send Email" path="Home / Contacts / Send Email" />

      <Container>
        <Grid
          display="flex"
          justifyContent={{ xs: "center", sm: "end" }}
          alignItems="center"
          gap="10px"
          mb="10px"
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "#DC3545", width: "120px" }}
          >
            Discard
          </Button>
          <Button variant="contained" sx={{ width: "120px" }}>
            Send
          </Button>
        </Grid>
        <Grid
          container
          spacing={2}
          columns={16}
          sx={{
            paddingInline: "40px",
            paddingBlock: "20px",
            bgcolor: "white",
            border: 1,
            borderColor: grey[500],
            marginBlock: 1,
          }}
        >
          <Grid
            item
            xs={16}
            md={8}
            spacing={2}
            display="flex"
            alignItems="center"
          >
            <InputLabel sx={{ fontWeight: "bold", flexGrow: 1 }}>
              To:
            </InputLabel>
            <TextField label="abc@xyz.com" size="small" sx={{ flexGrow: 15 }} />
          </Grid>

          <Grid item xs={16} md={16} container spacing={2}>
            <Grid item xs={16} md={8} display="flex" alignItems="center">
              <InputLabel sx={{ fontWeight: "bold", flexGrow: 1 }}>
                CC:
              </InputLabel>
              <TextField
                label="abc@xyz.com"
                size="small"
                sx={{ flexGrow: 15 }}
              />
            </Grid>
            <Grid item xs={16} md={8} display="flex" alignItems="center">
              <InputLabel sx={{ fontWeight: "bold", flexGrow: 1 }}>
                TC:
              </InputLabel>
              <TextField
                label="abc@xyz.com"
                size="small"
                sx={{ flexGrow: 15 }}
              />
            </Grid>
          </Grid>

          <Grid item xs={16} md={8} display="flex" alignItems="center">
            <InputLabel sx={{ fontWeight: "bold", flexGrow: 1 }}>
              Subject:
            </InputLabel>
            <TextField label="Subject" size="small" sx={{ flexGrow: 15 }} />
          </Grid>

          <Grid item xs={16} md={16}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={10}
              style={{ width: "100%" }}
              placeholder="Message"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Index;
