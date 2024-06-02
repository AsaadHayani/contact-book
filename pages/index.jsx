import {
  Container,
  Grid,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import Path from "./components/Path";
import Link from "next/link";
import { useTheme } from "@emotion/react";
import axiosInstance from "./components/api";
import { useQuery } from "@tanstack/react-query";
import Loading from "./components/Loading";
import Cookies from "universal-cookie";
import TableHome from "./components/TableHome";
import CardsHome from "./components/CardsHome";

const links = [
  { name: "register", link: "register" },
  { name: "login", link: "login" },
  { name: "reset-pass", link: "set-pass" },
  { name: "change-pass", link: "change-pass" },
  { name: "users", link: "users" },
  { name: "users/invite-user", link: "users/invite-user" },
  { name: "contacts", link: "contacts" },
  { name: "contacts/create", link: "contacts/create" },
  { name: "activities", link: "activities" },
  { name: "export-email", link: "export-email" },
  { name: "profile", link: "profile" },
  { name: "send-email", link: "send-email" },
  { name: "print", link: "print" },
];

export default function Home() {
  const theme = useTheme();
  const cookie = new Cookies();
  const fetchData = async () => {
    const response = await axiosInstance.get(`logs`, {
      headers: {
        Authorization: `Bearer ${cookie.get("Bearer")}`,
      },
    });
    return response.data;
  };
  const { data: logs, isLoading, isError, error } = useQuery({
    queryKey: ["logs"],
    queryFn: fetchData,
  });

  const latestFourLogs = logs ? logs.slice(-4) : [];
  const latestSixLogs = logs ? logs.slice(-6) : [];

  if (isLoading) return <Loading open={isLoading} />;
  return (
    <>
      <Path title="Home" path="Statistical Dashboard" />
      {isError && (
        <Snackbar open={isError} autoHideDuration={3000}>
          <Alert variant="filled" severity="error">
            {error.message}
          </Alert>
        </Snackbar>
      )}

      <Container>
        <Grid container spacing={5} columns={12}>
          <CardsHome latestFourLogs={latestFourLogs} />

          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: "10px", bgcolor: "#f3f3f3" }}>
              <Typography variant="h6">Latest activities</Typography>
            </Paper>
            <TableHome latestSixLogs={latestSixLogs} />
          </Grid>
        </Grid>

        {links.map((item) => (
          <div
            key={item.name}
            style={{
              marginBottom: "10px",
              display: "block",
              fontSize: "20px",
            }}
          >
            <Link href={`/${item.link}`} target="_blank">
              {item.name}
            </Link>
            <br />
          </div>
        ))}
      </Container>
    </>
  );
}
