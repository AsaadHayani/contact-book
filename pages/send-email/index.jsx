import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Snackbar,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import Path from "../components/Path";
import { grey } from "@mui/material/colors";
import axiosInstance from "../components/api";
import Cookies from "universal-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import ButtonGroups from "./ButtonGroups";
import Error from "../components/Error";

const Index = () => {
  const [form, setForm] = React.useState({
    to: "to@xyz.com",
    cc: "cc@xyz.com",
    bcc: "bcc@xyz.com",
    subject: "subject",
    body: "message",
  });
  const [errors, setErrors] = React.useState({});

  const cookie = new Cookies();
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const handleSubmit = async () => {
    const response = await axiosInstance.post(
      `contacts/send-email`,
      {
        to: form.to,
        cc: form.cc,
        bcc: form.bcc,
        subject: form.subject,
        body: form.body,
      },
      {
        headers: {
          Authorization: `Bearer ${cookie.get("Bearer")}`,
        },
      }
    );
    return response.data;
  };
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["send-email"] });
      router.push(`/users`);
      console.log("send-email success");
    },
    onError: (error) => console.log(error),
  });

  const handleSendEmail = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.to) newErrors.to = "Field required";
    if (!form.cc) newErrors.cc = "Field required";
    if (!form.bcc) newErrors.bcc = "Field required";
    if (!form.subject) newErrors.subject = "Field required";
    if (!form.body) newErrors.body = "Field required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      mutate(form);
    }
  };
  const [text, setText] = useState("");
  const [style, setStyle] = useState({});
  const [alignment, setAlignment] = useState("left");
  const [direction, setDirection] = useState("ltr");

  const handleChange = (event) => setText(event.target.value);

  return (
    <>
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error} />}
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
            sx={{
              bgcolor: "#DC3545",
              width: "120px",
              "&:hover": { bgcolor: "#b52230" },
              textTransform: "none",
            }}
          >
            Discard
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSendEmail}
            sx={{ width: "120px", textDecoration: "none" }}
          >
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
            <TextField
              type="email"
              required
              name="to"
              value={form.to}
              onChange={handleFormChange}
              label="abc@xyz.com"
              size="small"
              error={!!errors.to}
              helperText={errors.to}
              sx={{ flexGrow: 15 }}
            />
          </Grid>

          <Grid item xs={16} md={16} container spacing={2}>
            <Grid item xs={16} md={8} display="flex" alignItems="center">
              <InputLabel sx={{ fontWeight: "bold", flexGrow: 1 }}>
                CC:
              </InputLabel>
              <TextField
                label="abc@xyz.com"
                required
                type="email"
                value={form.cc}
                onChange={handleFormChange}
                name="cc"
                size="small"
                error={!!errors.cc}
                helperText={errors.cc}
                sx={{ flexGrow: 15 }}
              />
            </Grid>
            <Grid item xs={16} md={8} display="flex" alignItems="center">
              <InputLabel sx={{ fontWeight: "bold", flexGrow: 1 }}>
                TC:
              </InputLabel>
              <TextField
                label="abc@xyz.com"
                required
                type="email"
                value={form.bcc}
                onChange={handleFormChange}
                name="bcc"
                size="small"
                error={!!errors.bcc}
                helperText={errors.bcc}
                sx={{ flexGrow: 15 }}
              />
            </Grid>
          </Grid>

          <Grid item xs={16} md={8} display="flex" alignItems="center">
            <InputLabel sx={{ fontWeight: "bold", flexGrow: 1 }}>
              Subject:
            </InputLabel>
            <TextField
              label="Subject"
              type="text"
              required
              value={form.subject}
              onChange={handleFormChange}
              name="subject"
              size="small"
              error={!!errors.subject}
              helperText={errors.subject}
              sx={{ flexGrow: 15 }}
            />
          </Grid>

          <Grid item xs={16} md={16}>
            <ButtonGroups
              {...{ setAlignment, setDirection, setStyle, setText }}
            />
            <TextField
              label="Message"
              multiline
              rows={10}
              variant="outlined"
              fullWidth
              value={text}
              name="body"
              onChange={handleChange}
              error={!!errors.body}
              helperText={errors.body}
              sx={{ ...style, textAlign: alignment, direction }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Index;
