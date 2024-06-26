import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import Navbar from "./components/Navbar";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import Footer from "./components/Footer";
import ContextProvider from "./components/Context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      myColor: "#11cb5f",
      myGrey: "#E0E0E0",
      hoverBtn: "yellow",
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
  });

  const queryClient = new QueryClient();

  const route = useRouter();
  const login = "login",
    register = "register",
    changePass = "change-pass",
    setPass = "set-password",
    resetPass = "reset-password";
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <main className={roboto.className}>
              {route.pathname !== `/${login}` &&
              route.pathname !== `/${register}` &&
              route.pathname !== `/${changePass}` &&
              route.pathname !== `/${setPass}` &&
              route.pathname !== `/${resetPass}` ? (
                <Navbar />
              ) : null}
              <Component {...pageProps} />
            </main>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            {route.pathname !== `/${login}` &&
            route.pathname !== `/${register}` &&
            route.pathname !== `/${changePass}` &&
            route.pathname !== `/${setPass}` &&
            route.pathname !== `/${resetPass}` ? (
              <Footer />
            ) : null}
          </Box>
        </ThemeProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
}
