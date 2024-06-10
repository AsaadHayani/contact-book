import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Path from "../components/Path";
import { axiosInstance } from "../api/api";
import Cookies from "universal-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import ButtonGroups from "./ButtonGroups";
import Error from "../components/Error";

const Index = () => {
  const [form, setForm] = useState({
    to: "asaad99hayani@gmail.com",
    cc: "cc@xyz.com",
    bcc: "bcc@xyz.com",
    subject: "subject",
    body: "message",
  });
  const [errors, setErrors] = useState({});
  const cookie = new Cookies();
  const [errorEmail, setErrorEmail] = useState(false);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async () => {
    const response = await axiosInstance.post(`contacts/send-email`, form, {
      headers: {
        Authorization: `Bearer ${cookie.get("Bearer")}`,
      },
    });
    return response.data;
  };

  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["send-email"] });
      console.log("send-email success");
      setErrorEmail(true);
      router.push(`/users`);
    },
    onError: (error) => {
      if (error.response.data) setErrorEmail(true);
    },
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
      {isError && <Error error={error.message} />}
      <Path title="Send Email" path="Home / Contacts / Send Email" />

      <Container component="form">
        <Grid
          display="flex"
          justifyContent={{ xs: "center", sm: "end" }}
          alignItems="center"
          gap="20px"
          mb="20px"
        >
          <Button
            color="error"
            variant="contained"
            sx={{
              px: "30px",
              textTransform: "none",
            }}
          >
            Discard
          </Button>
          {cookie.get("role") !== "User" && (
            <Button
              variant="contained"
              type="submit"
              onClick={handleSendEmail}
              sx={{ width: "120px", textTransform: "none" }}
            >
              Send
            </Button>
          )}
        </Grid>

        <Grid container spacing={2} sx={{ bgcolor: "white" }}>
          <Grid item xs={12} md={12}>
            <Box display="flex" alignItems="center" gap="20px">
              <Typography color="initial" sx={{ fontWeight: "bold" }}>
                To:
              </Typography>
              <TextField
                type="email"
                required
                name="to"
                value={form.to}
                onChange={handleFormChange}
                label="abc@xyz.com"
                size="small"
                error={!!errors.to || errorEmail}
                helperText={errors.to || (errorEmail && "Email not Exist")}
                fullWidth
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap="20px">
              <Typography color="initial" sx={{ fontWeight: "bold" }}>
                CC:
              </Typography>
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
                fullWidth
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap="20px">
              <Typography color="initial" sx={{ fontWeight: "bold" }}>
                BCC:
              </Typography>
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
                fullWidth
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={12}>
            <Box display="flex" alignItems="center" gap="20px">
              <Typography color="initial" sx={{ fontWeight: "bold" }}>
                Subject:
              </Typography>
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
                fullWidth
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <ButtonGroups
              {...{ setAlignment, setDirection, setStyle, setText }}
            />
            <TextField
              label="Message"
              multiline
              rows={10}
              variant="outlined"
              fullWidth
              value={form.body}
              name="body"
              onChange={handleFormChange}
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
