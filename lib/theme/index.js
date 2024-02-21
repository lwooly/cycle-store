import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { orange, grey } from '@mui/material/colors';
import {
  // eslint-disable-next-line camelcase
  Racing_Sans_One,
  // Josefin_Sans,
  // Poppins,
  Roboto,
  // Jost,
  // Epilogue,
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
const setTheme = createTheme({
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
      lineHeight: 1,
    },
    h2: {
      fontFamily: fontHeading.style.fontFamily,
      fontSize: '3.625rem', // 58px
      // marginBottom: '2em',
    },
    h3: {
      fontFamily: fontHeading.style.fontFamily,
      fontSize: '2.625rem',

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
      fontWeight: 500,
      marginBottom: 0,
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
      marginBottom: 0,
      color: grey,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          borderRadius: 0,
          padding: '15px 25px',
          lineHeight: 1,
          color: 'white',
        },
      },
    },
  },
});

const theme = responsiveFontSizes(setTheme);

export default theme;
