import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Grid } from "@mui/material";
import Path from "../components/Path";

const rows = [
  { contact: "John Doe", date: "2024-05-24", action: "Email", by: "Admin" },
  { contact: "Jane Smith", date: "2024-05-23", action: "Call", by: "Admin" },
];

export default function Activities() {
  return (
    <>
      <Path title="Activities" path="Home / Activities" />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 140 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Contact</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Action</TableCell>
                    <TableCell align="center">BY</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.contact}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.contact}
                      </TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.action}</TableCell>
                      <TableCell align="center">{row.by}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
