import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axiosInstance from "../components/api";
import Cookies from "universal-cookie";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import Error from "../components/Error";

const headCells = ["ID", "Image", "First Name", "Last Name", "Email", "Phone"];

const TablePrint = () => {
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

  return (
    <>
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error} />}
      <Box sx={{ width: "100%", my: 5 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {headCells.map((item, i) => {
                  return (
                    <TableCell
                      key={i}
                      sx={{
                        bgcolor: "black",
                        textAlign: "left",
                        color: "white",
                      }}
                    >
                      {item}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts?.length !== 0 ? (
                contacts?.map((contact, index) => {
                  return (
                    <TableRow hover key={contact.id}>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        {(index + 1).toString().padStart(3, "0")}
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
                      <TableCell align="center">{contact.email}</TableCell>
                      <TableCell align="center">
                        {contact.phoneNumber}
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
      </Box>
    </>
  );
};

export default TablePrint;
