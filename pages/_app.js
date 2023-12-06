import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/lib/theme";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
