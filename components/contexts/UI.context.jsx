import { createContext, useMemo, useState } from 'react';

export const UIContext = createContext({
  snackbar: {
    isOpen: false,
    hideDuration: 1000,
    onClose: () => {},
    message: 'success',
    showMessage: () => {},
  },
});

export function UIProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setServerity] = useState('info');

  const onClose = () => {
    setOpen(false);
    setMessage('');
    setServerity('info');
  };

  const showMessage = ({ type, string }) => {
    console.log(type, string);
    setOpen(true);
    setMessage(string);
    setServerity(type);
  };

  const contextValue = useMemo(
    () => ({
      isOpen: open,
      hideDuration: 1000,
      onClose,
      message,
      showMessage,
      severity,
    }),
    [open, onClose, message, showMessage, severity],
  );

  return (
    <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
  );
}
