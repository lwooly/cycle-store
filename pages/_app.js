import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/lib/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
