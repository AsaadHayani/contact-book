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
import { axiosInstance } from "./api/api";
import { useQuery } from "@tanstack/react-query";
import Loading from "./components/Loading";
import Cookies from "universal-cookie";
import TableHome from "./components/TableHome";
import CardsHome from "./components/CardsHome";
import Error from "./components/Error";
import { useEffect, useState } from "react";

export default function Home() {
  const theme = useTheme();
  const cookie = new Cookies();
  const fetchLogs = async () => {
    const response = await axiosInstance.get(`logs`, {
      headers: {
        Authorization: `Bearer ${cookie.get("Bearer")}`,
      },
    });
    return response.data;
  };
  const { data: logs, isPending, isError, error } = useQuery({
    queryKey: ["logs"],
    queryFn: fetchLogs,
  });
  const latestSixLogs = logs ? logs.slice(-6) : [];

  const fetchContacts = async () => {
    const response = await axiosInstance.get(`contacts`, {
      headers: {
        Authorization: `Bearer ${cookie.get("Bearer")}`,
      },
    });
    return response.data;
  };
  const { data: contacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  const [activeContacts, setActiveContacts] = useState([]);
  const [inactiveContacts, setInactiveContacts] = useState([]);
  const [emailContacts, setEmailContacts] = useState([]);
  const [noEmailContacts, setNoEmailContacts] = useState([]);

  useEffect(() => {
    if (contacts) {
      const active = contacts.filter((contact) => contact.status === "Active");
      const inactive = contacts.filter(
        (contact) => contact.status === "Inactive"
      );
      const withEmail = contacts.filter((contact) => contact.email);
      const withoutEmail = contacts.filter((contact) => !contact.email);

      setActiveContacts(active);
      setInactiveContacts(inactive);
      setEmailContacts(withEmail);
      setNoEmailContacts(withoutEmail);
    }
  }, [contacts]);
  return (
    <>
      {isPending && <Loading open={isPending} />}
      {isError && <Error error={error.message} />}
      <Path title="Home" path="Statistical Dashboard" />

      <Container>
        <Grid container spacing={5} columns={12} alignItems="center">
          <CardsHome
            activeContacts={activeContacts.length}
            inactiveContacts={inactiveContacts.length}
            emailContacts={emailContacts.length}
            noEmailContacts={noEmailContacts.length}
          />

          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: "10px", bgcolor: "#f3f3f3" }}>
              <Link
                href="/activities"
                style={{
                  color: "black",
                  textTransform: "none",
                  textDecoration: "none",
                }}
              >
                <Typography variant="h6">Latest activities</Typography>
              </Link>
            </Paper>
            <TableHome latestSixLogs={latestSixLogs} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
