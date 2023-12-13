import { CssBaseline, ThemeProvider } from '@mui/material';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import theme from '@/lib/theme';
import { UIProvider } from '@/components/contexts/UI.context';

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <CssBaseline />
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              <UIProvider>
                <Component {...pageProps} />
              </UIProvider>
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </UserProvider>
    </>
  );
}
