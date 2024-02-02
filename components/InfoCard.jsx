import React from 'react';
import Image from 'next/image';
import { useTheme } from '@emotion/react';
import { Box, Typography } from './mui';
import Paragraph from './Paragraph';

function InfoCard({ title, text = '', imageSrc, height = '300px' }) {
  const headerTextAlign = text ? 'left' : 'center';
  const headerVariant = text ? 'h4' : 'h5';

  const theme = useTheme();

  return (
    <Box
      component="article"
      sx={{
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '0%',
        height,
        position: 'relative',
        color: 'white',
        '&::before': {
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          content: '""',
          position: 'absolute',
          backgroundColor: 'transparent',
          backgroundImage: `linear-gradient(0deg, ${theme.palette.secondary.main} 0%, transparent 100%)`,
          opacity: 1,
          zIndex: 1,
        },
      }}
    >
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        style={{ zIndex: 0 }}
      />
      <Box
        sx={{
          p: 4,
          position: 'absolute',
          bottom: '0',
          zIndex: 2,
          color: 'white',
          textAlign: 'left',
          width: '100%',
        }}
      >
        <Typography
          component="h5"
          variant={headerVariant}
          textAlign={headerTextAlign}
        >
          {title}
        </Typography>
        {text && <Paragraph sx={{ zIndex: 2 }}>{text}</Paragraph>}
      </Box>
    </Box>
  );
}

export default InfoCard;
