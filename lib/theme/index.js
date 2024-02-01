import { createTheme } from '@mui/material/styles';
import { orange, grey } from '@mui/material/colors';
import {
  Racing_Sans_One,
  Josefin_Sans,
  Poppins,
  Roboto,
  Jost,
  Epilogue,
} from 'next/font/google';

const fontHeading = Racing_Sans_One({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
});

const fontBody = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

// import green from '@mui/material/colors/green';
const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
      contrastText: grey[900],
    },
    secondary: {
      main: '#161616',
      contrastText: grey[900],
    },
  },
  typography: {
    fontFamily: fontBody.style.fontFamily,
    fontSize: 12,
    h1: {
      fontFamily: fontHeading.style.fontFamily,
      fontSize: '5.3125rem',
      lineHeight: '1em',
    },
    h2: {
      fontFamily: fontHeading.style.fontFamily,
      fontWeight: 700,
    },
    h3: {
      fontFamily: fontHeading.style.fontFamily,
      fontSize: '1.2rem',
      fontWeight: 700,
      // marginTop: "1.2rem",
    },
    h4: {
      fontFamily: fontHeading.style.fontFamily,
      fontSize: '2rem',
    },
    h5: {
      fontFamily: fontHeading.style.fontFamily,
    },
    h6: {
      fontWeight: 500,
      fontFamily: fontHeading.style.fontFamily,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          borderRadius: 0,
        },
      },
    },
  }
});

export default theme;
