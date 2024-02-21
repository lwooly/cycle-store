import { Box, Typography } from '@/components/mui';

import { useTheme } from '@emotion/react';

function PageImageHeader({ title, imageSrc }) {
  const theme = useTheme();

  return (
    <Box
      component="div"
      sx={{
        height: '50vh',
        width: '100%',
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition: '50 50',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
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
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          //   maxWidth: '1200px',
          //   margin: '0 auto',
          height: '100%',
          width: '100%',
          postition: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          sx={{ color: 'white', zIndex: 2 }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

export default PageImageHeader;
