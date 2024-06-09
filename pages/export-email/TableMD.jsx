import { CopyAll, Star, StarBorder } from "@mui/icons-material";
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
import React from "react";

const TableMD = ({
  selected,
  contacts,
  handleClick,
  handleCopyEmail,
  handleFavorite,
  handleSelectAllClick,
  isSelected,
}) => {
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

  return (
    <TableContainer>
      <Table sx={{ minWidth: 150 }} aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={
                  selected.length > 0 && selected.length < contacts?.length
                }
                checked={
                  contacts?.length > 0 && selected.length === contacts?.length
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
                <TableRow hover key={contact.id} selected={isItemSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onChange={(event) => handleClick(event, contact.id)}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {(index + 1).toString().padStart(3, "0")}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleFavorite(contact?.id)}>
                      {contact?.isFavorite ? <Star /> : <StarBorder />}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={
                        contact?.image != ""
                          ? "/images/Placeholder.jpg"
                          : contact?.image
                      }
                      alt="person"
                      width={50}
                      height={50}
                      style={{ borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell align="center">{contact.firstName}</TableCell>
                  <TableCell align="center">{contact.lastName}</TableCell>
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
                  <TableCell align="center">{contact.phoneNumber}</TableCell>
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
                      onClick={() => router.push(`contacts/${contact.id}`)}
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
