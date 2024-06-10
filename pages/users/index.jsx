import * as React from "react";
import {
  Alert,
  Box,
  Container,
  Pagination,
  Paper,
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import TopTableUsers from "../components/TopTableUsers";
import Path from "../components/Path";
import { useRouter } from "next/router";
import { axiosInstance } from "../api/api";
import Cookies from "universal-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useTheme } from "@emotion/react";
import TableMD from "./TableMD";
import CardXS from "./CardXS";

const Index = () => {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const fetchUsers = async () => {
    const response = await axiosInstance.get(`users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: users, isPending, error, isError } = useQuery({
    queryFn: () => fetchUsers(),
    queryKey: ["users"],
  });

  const [selected, setSelected] = React.useState([]);
  const router = useRouter();

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const [selectId, setSelectId] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((user) => user.id);
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

  const [open, setOpen] = React.useState(false);

  const handleCopyEmail = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUsers = async () => {
    const response = await axiosInstance.delete(`users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: selectId,
    });
    return response.data;
  };

  const queryClient = useQueryClient();
  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error.message} />}
      <Path title="Users" path="Home / Users" />

      <Container>
        <TopTableUsers {...{ handleDelete, isPendingDelete }} />
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            {isSmallScreen ? (
              <CardXS
                {...{
                  users,
                  isSelected,
                  handleSelectAllClick,
                  handleClick,
                  selected,
                }}
              />
            ) : (
              <TableMD {...{ users, isSelected, handleClick, selected }} />
            )}
            <Pagination count={10} color="primary" shape="rounded" />
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
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Index;
