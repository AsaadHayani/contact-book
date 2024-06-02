import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import PropTypes from "prop-types";
import TopTableExportEmail from "../components/TopTableExportEmail";
import Path from "../components/Path";
import { CopyAll, StarBorder } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import axiosInstance from "../components/api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import Error from "../components/Error";

const headCells = [
  "ID",
  "Favorite",
  "Image",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Status",
  "Action",
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

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

  const [selected, setSelected] = React.useState([]);
  const router = useRouter();

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

  return (
    <>
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error} />}
      <Path title="Export Email" path="Home / Contacts / Export Email" />

      <Container>
        <TopTableExportEmail />
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 150 }} aria-labelledby="tableTitle">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < contacts?.length
                        }
                        checked={
                          contacts?.length > 0 &&
                          selected.length === contacts?.length
                        }
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    {headCells.map((title, i) => (
                      <TableCell key={i} sx={{ fontWeight: "bold" }}>
                        {title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts?.length !== 0 ? (
                    contacts?.map((contact, index) => {
                      const isItemSelected = isSelected(contact.id);
                      return (
                        <TableRow
                          hover
                          key={contact.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onChange={(event) =>
                                handleClick(event, contact.id)
                              }
                            />
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            {(index + 1).toString().padStart(3, "0")}
                          </TableCell>
                          <TableCell align="center">
                            <StarBorder />
                          </TableCell>
                          <TableCell align="center">
                            <img
                              src="/images/Person.png"
                              alt="person"
                              width={50}
                              height={50}
                              style={{ borderRadius: "50%" }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {contact.firstName}
                          </TableCell>
                          <TableCell align="center">
                            {contact.lastName}
                          </TableCell>
                          <TableCell align="center">
                            <Box display="flex" gap="10px" alignItems="center">
                              {contact.email}
                              <IconButton
                                onClick={() => handleCopyEmail(contact.email)}
                              >
                                <CopyAll />
                              </IconButton>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            {contact.phoneNumber}
                          </TableCell>
                          <TableCell align="center">
                            <Alert
                              icon={false}
                              severity={
                                contact.status === "Active"
                                  ? "success"
                                  : user.status === "Inactive"
                                  ? "warning"
                                  : "cyan"
                              }
                            >
                              {contact.status}
                            </Alert>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              onClick={() =>
                                router.push(`contacts/${contact.id}`)
                              }
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={12} align="center">
                        <Typography variant="h5" color="error">
                          Items Not Found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Index;
