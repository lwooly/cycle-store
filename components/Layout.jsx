import React, { useContext } from 'react';
import { Alert, Snackbar } from '@/components/mui';
import { UIContext } from '@/components/contexts/UI.context';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import BasketUserManagement from './BasketUserManagement';

function Layout({ children }) {
  const {
    isOpen: open,
    severity,
    onClose: handleClose,
    message,
    hideDuration,
  } = useContext(UIContext);

  return (
    <>
      <header>
        <Header />
      </header>
      <Box
        sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <main>{children}</main>

        <Footer />
      </Box>

      <BasketUserManagement />
      <Snackbar
        open={open}
        autoHideDuration={hideDuration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: '100%', mb: 0, display: 'flex', alignItems: 'center' }}
        >
          {message}
          {/* <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton> */}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Layout;
