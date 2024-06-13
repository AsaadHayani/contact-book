import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import ColoredBullet from "./ColoredBullet";
import { useTheme } from "@emotion/react";

const TableHome = ({ latestSixLogs }) => {
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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return isSmallScreen ? (
    <Paper sx={{ p: "10px" }}>
      {latestSixLogs?.map((log) => {
        const date = new Date(log.timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        return (
          <div key={log.id}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" color="initial">
                {log.contact}
              </Typography>
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
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" color="grey">
                {formattedDate}
              </Typography>
              <Typography
                variant="span"
                color="initial"
                bgcolor="#eee"
                fontWeight="bold"
                padding="10px 20px"
              >
                {log.by}
              </Typography>
            </Box>
          </div>
        );
      })}
    </Paper>
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
        <TableBody>
          {latestSixLogs?.map((log) => {
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
                <TableCell component="th" scope="row" sx={{ pr: 10 }}>
                  {log.contact}
                </TableCell>
                <TableCell align="center">{formattedDate}</TableCell>
                <TableCell align="center">
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
                <TableCell align="center">
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
  );
};

export default TableHome;
