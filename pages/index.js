import {
  Container,
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ArrowDownward,
  ArrowUpwardRounded,
  Close,
  Email,
} from "@mui/icons-material";
import Title from "./components/Title";
import Path from "./components/Path";
import Link from "next/link";
import { useTheme } from "@emotion/react";

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Cupcake", 305, 3.7, 67),
  createData("Gingerbread", 356, 16.0, 49),
];

const cards = [
  {
    title: "100",
    desc: "Full resolution",
    text: "ID: 1030114",
    color: "#00AC69",
    icon: ArrowUpwardRounded,
  },
  {
    title: "101",
    desc: "Full resolution",
    text: "ID: 1030114",
    color: "#FC766A",
    icon: ArrowDownward,
  },
  {
    title: "102",
    desc: "Full resolution",
    text: "ID: 1030114",
    color: "#2C3E50",
    icon: Email,
  },
  {
    title: "103",
    desc: "Full resolution",
    text: "ID: 1030114",
    color: "#5B84B1",
    icon: Close,
  },
];

const links = [
  { name: "register", link: "register" },
  { name: "login", link: "login" },
  { name: "set-pass", link: "set-pass" },
  { name: "change-pass", link: "change-pass" },
  { name: "users", link: "users" },
  { name: "users/details", link: "users/details" },
  { name: "users/edit", link: "users/edit" },
  { name: "users/invite-user", link: "users/invite-user" },
  { name: "contacts", link: "contacts" },
  { name: "contacts/details", link: "contacts/details" },
  { name: "contacts/create", link: "contacts/create" },
  { name: "contacts/edit", link: "contacts/edit" },
  { name: "activities", link: "activities" },
  { name: "export-email", link: "export-email" },
  { name: "profile", link: "profile" },
  { name: "send-email", link: "send-email" },
];

export default function Home() {
  const theme = useTheme();
  return (
    <>
      <Path title="Home" path="Statistical Dashboard" />

      <Container>
        <Grid container spacing={5} columns={12}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {cards.map((card) => {
                return (
                  <Grid item xs={12} md={6} key={card.title}>
                    <Paper
                      sx={{
                        p: 2,
                        margin: "auto",
                        maxWidth: 500,
                        flexGrow: 1,
                        backgroundColor: card.color,
                      }}
                      className="card-home"
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Grid item xs>
                              <Typography
                                color="inherit"
                                gutterBottom
                                variant="h5"
                              >
                                {card.title}
                              </Typography>
                              <Typography variant="p">{card.desc}</Typography>
                              <Typography
                                variant="body2"
                                mt="10px"
                                color="text.secondary"
                              >
                                {card.text}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <card.icon
                              sx={{
                                fontSize: "30px",
                                padding: "5px",
                                color: card.color,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: "10px", bgcolor: theme.palette.myGrey }}>
              <Typography variant="h6">Latest activities</Typography>
            </Paper>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 300 }}
                size="small"
                aria-label="a dense table"
              >
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
