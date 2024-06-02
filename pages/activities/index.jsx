import * as React from "react";
import {
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Path from "../components/Path";
import axiosInstance from "../components/api";
import Cookies from "universal-cookie";
import { useQuery } from "@tanstack/react-query";
import ColoredBullet from "../components/ColoredBullet";

export default function Activities() {
  const cookie = new Cookies();
  const fetchLogs = async () => {
    const response = await axiosInstance.get(`logs`, {
      headers: {
        Authorization: `Bearer ${cookie.get("Bearer")}`,
      },
    });
    return response.data;
  };
  const { data: logs, isLoading, error, isError } = useQuery({
    queryKey: ["logs"],
    queryFn: fetchLogs,
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (isError) return alert(`Error: ${error.message}`);
  if (isLoading)
    return (
      <Typography variant="h4" textAlign="center" color="error">
        Loading...
      </Typography>
    );
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
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>BY</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logs?.map((log) => {
                    const date = new Date(log.timestamp);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = months[date.getMonth()];
                    const year = date.getFullYear();
                    const formattedDate = `${day} ${month} ${year}`;
                    return (
                      <TableRow
                        key={log.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {log.contact}
                        </TableCell>
                        <TableCell align="left">{formattedDate}</TableCell>
                        <TableCell align="left">
                          <ColoredBullet
                            text={log.action}
                            color={
                              log.action === "Add"
                                ? "#00AC69"
                                : log.action === "Access"
                                ? "#0061F2"
                                : log.action === "Delete"
                                ? "#FC766A"
                                : log.action === "Update"
                                ? "#F4A100"
                                : log.action === "Email sent"
                                ? "#17C3B2"
                                : "cyan"
                            }
                          />
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            variant="span"
                            color="initial"
                            bgcolor="#eee"
                            fontWeight="bold"
                            padding="10px 20px"
                          >
                            {log.by}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
