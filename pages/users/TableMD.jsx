import { CopyAll } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const TableMD = ({
  users,
  isSelected,
  handleClick,
  selected,
  handleSelectAllClick,
}) => {
  const headCells = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Status",
    "Action",
  ];
  const router = useRouter();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 150 }} aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={
                  selected?.length > 0 && selected?.length < users?.length
                }
                checked={
                  users?.length > 0 && selected?.length === users?.length
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
          {users?.length !== 0 ? (
            users?.map((user, index) => {
              const isItemSelected = isSelected(user.id);
              if (user.role !== "Owner")
                return (
                  <TableRow hover key={user.id} selected={isItemSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, user.id)}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {(index + 1).toString().padStart(3, "0")}
                    </TableCell>
                    <TableCell align="center">{user.firstName}</TableCell>
                    <TableCell align="center">{user.lastName}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" gap="10px" alignItems="center">
                        {user.email}
                        <IconButton onClick={() => handleCopyEmail(user.email)}>
                          <CopyAll />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{user.phoneNumber}</TableCell>
                    <TableCell align="center">
                      <Alert
                        icon={false}
                        severity={
                          user.status === "Pending"
                            ? "warning"
                            : user.status === "Active"
                            ? "error"
                            : user.status === "Locked"
                            ? "info"
                            : "cyan"
                        }
                      >
                        {user.status}
                      </Alert>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{ textTransform: "none" }}
                        onClick={() => router.push(`/users/${user.id}`)}
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
  );
};

export default TableMD;
