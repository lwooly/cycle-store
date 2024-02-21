import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';
import ProfileLinks from './ProfileLinks';

function Footer() {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.secondary.main,
        height: '8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 'auto',
      }}
    >
      <Typography sx={{ marginLeft: '1rem' }} variant="h6" color="#FFF">
        Design by websitedemos.net
      </Typography>
      <ProfileLinks color="#FFF" />
    </Box>
  );
}

export default Footer;
