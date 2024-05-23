import React from "react";
import {
  Box,
  Button,
  Card,
  Container,
  InputLabel,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import Path from "../components/Path";

const Index = () => {
  return (
    <>
      <Path title="Send Email" path="Home / Contacts / Send Email" />

      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "end",
            mb: "10px",
          }}
        >
          <Button variant="contained" sx={{ bgcolor: "#DC3545" }}>
            Discard
          </Button>
          <Button variant="contained">Send</Button>
        </Box>
        <Card sx={{ paddingInline: "40px", paddingBlock: "20px" }}>
          <Box className="top-table" justifyContent="start">
            <InputLabel sx={{ fontWeight: "bold" }}>To:</InputLabel>
            <TextField
              id="outlined-basic"
              label="abc@xyz.com"
              size="small"
              sx={{ flexGrow: 1 }}
            />
          </Box>
          <Box className="top-table">
            <Box className="top-table">
              <InputLabel sx={{ fontWeight: "bold" }}>CC:</InputLabel>
              <TextField id="outlined-basic" label="abc@xyz.com" size="small" />
            </Box>
            <Box className="top-table">
              <InputLabel sx={{ fontWeight: "bold" }}>TC:</InputLabel>
              <TextField
                id="outlined-basic"
                label="abc@xyz.com"
                size="small"
                sx={{ flexGrow: 2 }}
              />
            </Box>
          </Box>
          <Box className="top-table" justifyContent="start">
            <InputLabel sx={{ fontWeight: "bold" }}>Subject:</InputLabel>
            <TextField
              id="outlined-basic"
              label="abc@xyz.com"
              size="small"
              sx={{ flexGrow: 1 }}
            />
          </Box>
          <Box className="top-table" justifyContent="start">
            <TextareaAutosize
              aria-label="minimum height"
              minRows={10}
              placeholder="Message"
            />
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Index;
