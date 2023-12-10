import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/lib/theme";
import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
