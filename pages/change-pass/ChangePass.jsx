import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import axiosInstance from "../components/api";
import Loading from "../components/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Error from "../components/Error";

const ChangePass = () => {
  const [email, setEmail] = useState("asaad99hayani@gmail.com");
  const [errorEmail, setErrorEmail] = useState(false);

  const changePassword = async () => {
    const response = await axiosInstance.post(`forgot-password`, { email });
    return response.data;
  };

  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forgot-pass"] });
      console.log("email send successfully");
    },
    onerror: (error) => {
      if (error.response.status === 404) setErrorEmail(true);
    },
  });

  const [errors, setErrors] = React.useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = "Field required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      mutate(email);
    }
  };

  return (
    <>
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error.message} />}

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
      <Button
        variant="contained"
        type="submit"
        onClick={handleSubmit}
        sx={{ textTransform: "none" }}
      >
        Send
      </Button>
      <Link style={{ marginTop: "30px", textAlign: "center" }} href={"/login"}>
        Back to login
      </Link>
    </>
  );
};

export default ChangePass;
