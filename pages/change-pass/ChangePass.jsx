import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import axiosInstance from "../components/api";
import Loading from "../components/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ChangePass = () => {
  const [email, setEmail] = useState("asaad99hayani@gmail.com");
  const [errorEmail, setErrorEmail] = useState(false);

  const [loading, setLoading] = useState(false);

  const createContact = async () => {
    const response = await axiosInstance.post(
      `forgot-password`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forgot-pass"] });
      console.log("email send successfully");
    },
    onerror: (error) => {
      console.log(error.response.status);
      if (error.response.status === 404) setErrorEmail(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    mutate(email);
  };

  return (
    <>
      {loading && <Loading open={loading} setOpen={setLoading} />}
      <TextField
        label="Enter your email address"
        size="small"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type="text"
        error={errorEmail}
        helperText={errorEmail ? "Email not Exist!" : null}
      />
      <Button variant="contained" type="submit" onClick={handleSubmit}>
        Send
      </Button>
      <Link style={{ marginTop: "30px", textAlign: "center" }} href={"/login"}>
        Back to login
      </Link>
    </>
  );
};

export default ChangePass;
