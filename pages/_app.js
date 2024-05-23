import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import Navbar from "./components/Navbar";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from "@mui/material";
import { orange } from "@mui/material/colors";
import Footer from "./components/Footer";
import ContextProvider from "./components/Context";

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

  const route = useRouter();
  const login = "login",
    register = "register",
    changePass = "change-pass",
    setPass = "set-pass";
  return (
    <main className={roboto.className}>
      <ContextProvider>
        {route.pathname !== `/${login}` &&
        route.pathname !== `/${register}` &&
        route.pathname !== `/${changePass}` &&
        route.pathname !== `/${setPass}` ? (
          <Navbar />
        ) : null}
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
        <Footer />
      </ContextProvider>
    </main>
  );
}
