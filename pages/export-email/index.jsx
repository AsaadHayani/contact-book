import * as React from "react";
import {
  Box,
  Checkbox,
  Container,
  IconButton,
  Pagination,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import TopTableExportEmail from "../components/TopTableExportEmail";
import Path from "../components/Path";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import axiosInstance from "../components/api";
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

  const handleCopyEmail = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setOpen(true);
    });
  };

  const [selected, setSelected] = React.useState([]);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = contacts.map((contact) => contact.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isPendingFavorite && <Loading open={isPendingFavorite} />}
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error} />}
      <Path title="Export Email" path="Home / Contacts / Export Email" />

      <Container>
        <TopTableExportEmail />
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            {isSmallScreen ? (
              <CardXS
                {...{ contacts, isSelected, handleClick, handleFavorite }}
              />
            ) : (
              <TableMD
                {...{
                  contacts,
                  selected,
                  handleClick,
                  handleCopyEmail,
                  handleFavorite,
                  handleSelectAllClick,
                  isSelected,
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
