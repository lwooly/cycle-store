import React from 'react';
import { Box } from '@mui/material';
import Service from '@/components/Service';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ChatIcon from '@mui/icons-material/Chat';

const serviceInfo = [
  {
    icon: <LocalShippingIcon fontSize="inherit" />,
    heading: 'Delivery',
    description: 'Next day delivery',
  },
  {
    icon: <MiscellaneousServicesIcon fontSize="inherit" />,
    heading: 'Service',
    description: 'High quality service',
  },
  {
    icon: <ChatIcon fontSize="inherit" />,
    heading: 'Expert advice',
    description: 'Here to help',
  },
];

function ServiceInfo() {
  return (
    <Box
      sx={{
        display: { xs: 'block', md: 'flex' },
        paddingTop: '100px',
        paddingBottom: { xs: '100px', md: '200px' },
      }}
    >
      {serviceInfo.map((service) => (
        <Service key={service.heading} serviceInfo={service} />
      ))}
    </Box>
  );
}

export default ServiceInfo;
