import React, { useState } from "react";
import TopTableContacts from "../components/TopTableContacts";
import {
  Alert,
  Box,
  Container,
  Pagination,
  Paper,
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import Path from "../components/Path";
import { axiosInstance } from "../api/api";
import Cookies from "universal-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useTheme } from "@emotion/react";
import CardXS from "./CardXS";
import TableMD from "./TableMD";

const Index = () => {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const fetchContacts = async () => {
    const response = await axiosInstance.get(`contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: contacts, isPending, error, isError } = useQuery({
    queryFn: fetchContacts,
    queryKey: ["contacts"],
  });

  const [open, setOpen] = React.useState(false);

  const handleCopyEmail = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selected, setSelected] = useState([]);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const [selectId, setSelectId] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = contacts.map((contact) => contact.id);
      setSelected(newSelecteds);
      setSelectId(newSelecteds);
      return;
    }
    setSelected([]);
    setSelectId([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    setSelectId(newSelected);
  };

  const favorite = async (id) => {
    const response = await axiosInstance.patch(
      `contacts/toggle-favorite/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const queryClient = useQueryClient();
  const { mutate, isPending: isPendingFavorite } = useMutation({
    mutationFn: (id) => favorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const handleFavorite = (id) => {
    mutate(id);
  };

  const deleteContacts = async () => {
    const response = await axiosInstance.delete(`contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: selectId,
    });
    return response.data;
  };

  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteContacts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setSelectId([]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = () => {
    mutateDelete();
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isPendingDelete && <Loading open={isPendingDelete} />}
      {isPendingFavorite && <Loading open={isPendingFavorite} />}
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error.message} />}

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
        >
          Email copied to clipboard
        </Alert>
      </Snackbar>
      <Path title="Contacts" path="Home / Contacts" />

      <Container>
        <TopTableContacts {...{ handleDelete, isPendingDelete }} />
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            {isSmallScreen ? (
              <CardXS
                {...{ contacts, isSelected, handleFavorite, handleClick }}
              />
            ) : (
              <TableMD
                {...{
                  contacts,
                  isSelected,
                  handleCopyEmail,
                  handleSelectAllClick,
                  handleFavorite,
                  handleClick,
                  selected,
                }}
              />
            )}
            <Pagination count={10} color="primary" shape="rounded" />
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Index;
