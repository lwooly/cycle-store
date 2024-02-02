import React, { useContext } from 'react';
import { Alert, Snackbar, IconButton, CloseIcon } from '@/components/mui';
import { UIContext } from '@/components/contexts/UI.context';
import Header from './Header';
import Footer from './Footer';

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
      <main>{children}</main>
      <Footer />
      <Snackbar
        open={open}
        autoHideDuration={hideDuration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: '100%', mb: 0 }}
        >
          {message}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Alert>
      </Snackbar>
    </>
  );
}

export default Layout;
