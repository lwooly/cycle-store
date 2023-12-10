import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/lib/theme";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { UIProvider } from "@/components/contexts/UI.context";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <CssBaseline />
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <UIProvider>
              <Component {...pageProps} />
            </UIProvider>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
