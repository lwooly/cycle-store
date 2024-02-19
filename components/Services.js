import React from 'react';
import Heading from './Heading';
import { Box, Typography } from '@mui/material';

function Service({ serviceInfo }) {
  const { icon, heading, description } = serviceInfo;
  return (
    <Box>
      {icon}
      <Typography component="h3">{heading}</Typography>
      <Typography component="body1"> {description}</Typography>
    </Box>
  );
}

export default Service;
