import { createContext, useState, useCallback  } from "react";


export const UIContext = createContext({
    snackbar: {
        isOpen: false,
        hideDuration: 6000,
        onClose: () => {},
        message: "success",
        showMessage:() => {},
    }
});

export const UIProvider = ({children}) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setServerity] = useState('');

    const onClose = () => {
        setOpen(false);
        setMessage('');
        setServerity('');
    };

    const showMessage = ({type, string}) => {
        console.log(type, string);
        setOpen(true);
        setMessage(string);
        setServerity(type);
    };

    return <UIContext.Provider
    value={{
        isOpen: open,
        hideDuration: 6000,
        onClose,
        message,
        showMessage,
        severity,
    }}
    >
        {children}
    </UIContext.Provider>
}
