import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

function Service({ serviceInfo }) {
  const theme = useTheme();

  const { icon, heading, description } = serviceInfo;
  return (
    <Box sx={{ textAlign: 'center', flexBasis: 1, flexGrow: 1 }}>
      <Box sx={{ color: theme.palette.primary.main, fontSize:'3rem'}}>{icon}</Box>
      <Typography component="h3" variant="h3">
        {heading}
      </Typography>
      <Typography component="body1" variant="body1">
        {description}
      </Typography>
    </Box>
  );
}

export default Service;
