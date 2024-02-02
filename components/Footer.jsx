import { Box, Typography } from '@mui/material';
import React from 'react';
import ProfileLinks from './ProfileLinks';
import { useTheme } from '@emotion/react';

function Footer() {
  const theme = useTheme();
  return (
    <Box
      component={'footer'}
      sx={{
        backgroundColor: theme.palette.secondary.main,
        height: '8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Typography variant="h6" color={'#FFF'}>
        Design by websitedemos.net
      </Typography>
      <ProfileLinks color={'#FFF'} />
    </Box>
  );
}

export default Footer;
